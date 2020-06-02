import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="renderer" content="webkit" />
          <meta
            name="keywords"
            content="票税宝,电子发票打印,个税,个税管理,个人税筹,电子发票,识别发票,重复报销,家庭纳税,以家庭为纳税单位,家庭税赋制,手机开票,发票助手,发票真伪,发票查验,发票查询,发票管家,发票鉴伪,我的发票,piaoshuibao,家庭财税机器人"
          />
          <meta
            name="description"
            content="票税宝-家庭财税机器人上线,专业的家庭税筹规划和电子发票管理软件.提供最完善的个税税筹服务和家庭纳税税筹服务,解读最前沿的家庭税赋制度.电子发票打印发票自动去重自动鉴伪识别电子发票防止电子发票重复报销票税宝官网piaoshuibao"
          />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="/static/css/reset.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
