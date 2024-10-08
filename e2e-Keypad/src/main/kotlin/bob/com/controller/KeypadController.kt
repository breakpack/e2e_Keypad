package bob.com.controller

import bob.com.service.KeypadResponse
import bob.com.service.KeypadService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate
import bob.com.service.RedisService


data class PostRequest(
    val userId: String,
    val userInput: String,
    val timestampHash: String
)

@RestController
@RequestMapping("/api")
class KeypadController(private val keypadService: KeypadService, private val redisService: RedisService) {

    @GetMapping("/keypad")
    fun getKeypad(@RequestParam userId: String): KeypadResponse {
        return keypadService.generateKeypad(userId)
    }

    @PostMapping("/verify")
    fun verifyAndForward(@RequestBody request: PostRequest): ResponseEntity<String> {
        // Redis에서 저장된 KeypadResponse 가져오기
        val savedResponse = redisService.getKeypadResponse(request.userId)

        if (savedResponse != null && savedResponse.timestampHash == request.timestampHash) {
            // 빈 문자열을 제거하고 keyHashMap 생성
            val keyHashMap = savedResponse.shuffledHashes
                .filter { it.isNotEmpty() }
                .mapIndexed { index, value -> index.toString() to value }
                .toMap()

            val payload = mapOf(
                "userInput" to request.userInput,
                "keyHashMap" to keyHashMap
            )

            val restTemplate = RestTemplate()
            val endpointUrl = "http://146.56.119.112:8081/auth"
            println(payload)
            val response = restTemplate.postForObject(endpointUrl, payload, String::class.java)

            return if (response != null && response.startsWith("SUCCESS")) {
                ResponseEntity.ok(response)
            } else {
                ResponseEntity.status(400).body(response)
            }
        }

        return ResponseEntity("Invalid userId or timestampHash", HttpStatus.UNAUTHORIZED)
    }
}