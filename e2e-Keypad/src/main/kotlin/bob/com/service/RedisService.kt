package bob.com.service

import com.google.gson.Gson
import org.springframework.stereotype.Service
import redis.clients.jedis.Jedis

@Service
class RedisService {

    private val jedis = Jedis("localhost", 6379)
    private val gson = Gson()

    fun saveKeypadResponse(userId: String, response: KeypadResponse) {
        val jsonResponse = gson.toJson(response)
        jedis.set(userId, jsonResponse)
    }

    fun getKeypadResponse(userId: String): KeypadResponse? {
        val jsonResponse = jedis.get(userId)
        return if (jsonResponse != null) {
            gson.fromJson(jsonResponse, KeypadResponse::class.java)
        } else {
            null
        }
    }
}