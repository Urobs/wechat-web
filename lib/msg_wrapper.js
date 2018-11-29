function txtMsg (toUser, fromUser, content) {
  const time = new Date().getTime()
  const xmlContent = 
    `<xml>
    <ToUserName><![CDATA[${ toUser }]]></ToUserName>
    <FromUserName><![CDATA[${ fromUser }]]></FromUserName>
    <CreateTime>${ time }</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${ content }]]></Content>
    </xml>`
  return xmlContent
}
function graphicMsg (toUser, fromUser, contentArr) {
  const time = new Date().getTime()
  let articlesList = ""
  contentArr.map(item => {
    articlesList += "<item>";
    articlesList += "<Title><![CDATA["+ item.Title +"]]></Title>";
    articlesList += "<Description><![CDATA["+ item.Description +"]]></Description>";
    articlesList += "<PicUrl><![CDATA["+ item.PicUrl +"]]></PicUrl>";
    articlesList += "<Url><![CDATA["+ item.Url +"]]></Url>";
    articlesList += "</item>";
  })
  const xmlContent = 
    `<xml>
    <ToUserName><![CDATA[${ toUser }]]></ToUserName>
    <FromUserName><![CDATA[${ fromUser }]]></FromUserName>
    <CreateTime>${ time }</CreateTime>
    <MsgType><![CDATA[news]]></MsgType>
    <ArticleCount>${ contentArr.length }</ArticleCount>
    <Articles>${ articlesList }</Articles>
    </xml>`              
  return xmlContent
}
function imageMsg (toUser, fromUser, mediaId) {
  const time = new Date().getTime()
  const xmlContent =
    `<xml>
    <ToUserName><![CDATA[${ toUser }]]></ToUserName>
    <FromUserName><![CDATA[${ fromUser }]]></FromUserName>
    <CreateTime>${ time }</CreateTime>
    <MsgType><![CDATA[image]]></MsgType>
    <Image><MediaId><![CDATA[${ mediaId }]]></MediaId></Image>
    </xml>`
  return xmlContent
}
function videoMsg (toUser, fromUser, mediaId) {
  const time = new Date().getTime()
  const xmlContent = 
    `<xml>
    <ToUserName><![CDATA[${ toUser }]]></ToUserName>
    <FromUserName><![CDATA[${ fromUser }]]></FromUserName>
    <CreateTime>${ time }</CreateTime>
    <MsgType><![CDATA[video]]></MsgType>
    <Video><MediaId><![CDATA[${ mediaId }]]></MediaId></Video>
    </xml>`
  return xmlContent
}
module.exports = {
  txtMsg,
  graphicMsg,
  imageMsg,
  videoMsg
}