import type { Context } from 'koishi'
import * as z from 'zero-width-lib'

export const name = 'zero-width'

export function apply(ctx: Context) {

  const globalTimeout = 10000
  
  ctx.command('zero').alias('零宽')
    .usage('零宽字符工具\n' +
        'zero embed(emb/嵌入) [可见文本] [隐藏文本] - 将隐藏文本以零宽字符嵌入可见文本中\n' +
        'zero extract(ext/提取) [文本] - 提取指定文本中的零宽字符并解码\n' +
        'zero escape(esc/转义) [文本] - 使用零宽字符分隔文本来规避搜索')
  
  ctx.command('zero.embed [visible] [hidden]')
    .alias('zero.emb').alias('zero.嵌入')
    .action(async ({ session }, visible, hidden) => {
      let finalVisible = visible
      let finalHidden = hidden

      if (!finalVisible) {
        if (!session?.quote) {
          session.send('请输入可见文本')
          finalVisible = await session.prompt(globalTimeout)
        }
      }
      
      if (!finalHidden) {
        session.send('请输入要隐藏的文本')
        finalHidden = await session.prompt(globalTimeout)
      }

      if (!finalVisible || !finalHidden) {
        return '输入已取消'
      }

      try {
        const result = z.encode(finalVisible, finalHidden)
        return `嵌入结果：${result}\n`
      } catch (e) {
        return `嵌入失败：${e.message}`
      }
    })

  ctx.command('zero.extract [text:text]')
    .alias('zero.ext').alias('zero.提取')
    .action(async ({ session }, text) => {
      let finalText = text

      if (!finalText) {
        session.send('请输入要提取的文本')
        finalText = await session.prompt(globalTimeout)
      }

      if (!finalText) {
        return '输入已取消'
      }

      try {
        const visible = z.extract(finalText).vis
        const hidden = z.decode(finalText)
        return `可见文本：${visible}\n隐藏文本：${hidden}`
      } catch (e) {
        return `提取失败：${e.message}`
      }
    })

  ctx.command('zero.escape [text]')
    .alias('zero.esc').alias('zero.转义')
    .action(async ({ session }, text) => {
      let finalText = text

      if (!finalText) {
        session.send('请输入要转义的文本')
        finalText = await session.prompt(globalTimeout)
      }

      if (!finalText) {
        return '输入已取消'
      }

      try {
        const result = z.split(finalText)
        return `转义结果：${result}`
      } catch (e) {
        return `转义失败：${e.message}`
      }
    })
}
