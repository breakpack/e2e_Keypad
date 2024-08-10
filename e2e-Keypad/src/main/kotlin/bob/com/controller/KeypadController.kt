package bob.com.controller

import bob.com.service.KeypadResponse
import bob.com.service.KeypadService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/keypad")
class KeypadController(private val keypadService: KeypadService) {

    @GetMapping
    fun getKeypad(): KeypadResponse {
        // KeypadService의 generateKeypad 메서드를 호출하여 키패드 데이터를 가져옴
        return keypadService.generateKeypad()
    }
}