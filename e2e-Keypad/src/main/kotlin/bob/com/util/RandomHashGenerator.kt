package bob.com.util

import java.security.MessageDigest
import java.security.SecureRandom
import java.time.Instant

object RandomHashGenerator {
    private val chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    private val random = SecureRandom()

    fun generate(length: Int): String {
        return (1..length)
            .map { chars[random.nextInt(chars.length)] }
            .joinToString("")
    }

    fun generateHash(input: String): String {
        val bytes = MessageDigest.getInstance("SHA-256").digest(input.toByteArray())
        return bytes.joinToString("") { "%02x".format(it) }.substring(0, 32) //32자리로 줄임
    }
    // 타임스탬프를 해시화하여 32자리 해시를 반환하는 함수
    fun generateTimestampHash(): String {
        val timestamp = Instant.now().toEpochMilli().toString()  // 현재 타임스탬프를 밀리초로 가져옴
        return generateHash(timestamp)  // 타임스탬프 해시 생성
    }
}