const getRedisSessionId = sid => {
  return `WebsitePsbSid:${sid}`
}
class RedisSessionStore {
  constructor(client) {
    this.client = client
  }
  /**
   * 获取redis里面存储的session数据
   * @param {*} sid sessionId
   */
  async get(sid) {
    // console.log(new Date(), `sid=${sid}`)
    const id = getRedisSessionId(sid)
    const data = await this.client.get(id)
    if (!data) {
      return null
    }
    try {
      const result = JSON.parse(data)
      return result
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 存储session数据到redis
   * @param {*} sid sessionId
   * @param {*} sessionContent session内容
   * @param {*} ttl redis当中存储的值的过期时间
   */
  async set(sid, sessionContent, ttl) {
    const id = getRedisSessionId(sid)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
    }
    try {
      const str = JSON.stringify(sessionContent)
      if (ttl) {
        await this.client.setex(id, ttl, str)
      } else {
        await this.client.set(id, str)
      }
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * 从redis中删除session
   * @param {*} sid sessionId
   */
  async destroy(sid) {
    try {
      const id = getRedisSessionId(sid)
      await this.client.del(id)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = RedisSessionStore
