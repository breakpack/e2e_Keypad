package bob.com.service

import bob.com.util.RandomHashGenerator
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Service
import java.awt.image.BufferedImage
import java.io.ByteArrayOutputStream
import java.util.Base64
import javax.imageio.ImageIO
import kotlin.random.Random

data class KeypadResponse(
    val shuffledHashes: Array<String>,
    val imageBase64: String
)

@Service
class KeypadService {

    private val numberHashes: Array<String> = Array(10) { "" }
    private var shuffledHashes: Array<String> = Array(12) { "" }

    // 0부터 9까지의 숫자에 매칭되는 해시값을 생성하여 배열에 저장
    private fun generateNumberHashes() {
        for (i in 0..9) {
            val randomString = RandomHashGenerator.generate(8)
            numberHashes[i] = RandomHashGenerator.generateHash(randomString)
        }
    }

    // 해시값 배열에 빈값 두 개를 추가하고, 랜덤으로 셔플
    private fun createShuffledArray() {
        shuffledHashes = numberHashes + arrayOf("", "") // 빈 값 두 개 추가
        shuffledHashes.shuffle(Random(System.currentTimeMillis())) // 랜덤으로 셔플
    }

    // 셔플된 해시 배열과 함께 키패드 이미지를 Base64로 인코딩하여 반환
    fun generateKeypad(): KeypadResponse {
        generateNumberHashes() // 요청이 들어올 때마다 해시값을 재생성
        createShuffledArray() // 해시값을 셔플

        val imagePaths = shuffledHashes.map { hash ->
            when (hash) {
                "" -> "static/images/_blank.png" // 빈 값은 _blank.png 사용
                else -> "static/images/_${numberHashes.indexOf(hash)}.png" // 숫자에 해당하는 이미지 사용
            }
        }

        // 이미지를 결합하고 Base64로 인코딩
        val combinedImage = combineImages(imagePaths)
        val imageBase64 = bufferedImageToBase64(combinedImage)

        return KeypadResponse(shuffledHashes, imageBase64)
    }

    // 이미지 결합 함수 - 가로로 출력되도록 수정
    private fun combineImages(imagePaths: List<String>): BufferedImage {
        val images = imagePaths.map { ClassPathResource(it).inputStream.use { stream -> ImageIO.read(stream) } }
        val width = images[0].width * 4 // 가로로 4칸
        val height = images[0].height * 3 // 세로로 3칸
        val combinedImage = BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB)
        val g = combinedImage.graphics

        for (i in images.indices) {
            val x = (i % 4) * images[0].width // 가로로 4칸 배치
            val y = (i / 4) * images[0].height // 세로로 3칸 배치
            g.drawImage(images[i], x, y, null)
        }
        g.dispose()
        return combinedImage
    }

    // BufferedImage를 Base64로 인코딩
    private fun bufferedImageToBase64(image: BufferedImage): String {
        val outputStream = ByteArrayOutputStream()
        ImageIO.write(image, "png", outputStream)
        val imageBytes = outputStream.toByteArray()
        return Base64.getEncoder().encodeToString(imageBytes)
    }
}