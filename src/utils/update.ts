/**
 * update 命令需要用到的所有方法
 */

import { green, red, blue } from 'chalk'
import {
    printMsg,
    getFilePath,
    TIMEOUT,
    handleUncompress,
    handleRename,
} from './common'
import { existsSync, remove, copySync, readJsonSync } from 'fs-extra'
import { join } from 'path'
import * as puppeteer from 'puppeteer'

// 本地配置文件名称
const localConfig = 'icon-local.json'
// 图标下载临时文件路径
const tempFilePath = getFilePath('_temp_iconfont')
// 需要copy的字体文件
const fileList = [
    'iconfont.css',
    'iconfont.ttf',
    'iconfont.woff',
    'iconfont.woff2',
]
// 登录地址
const loginUrl = 'https://www.iconfont.cn/login'
// 下载地址
const downloadApi = 'https://www.iconfont.cn/api/project/download.zip'

interface Info {
    userName: string
    password: string
    projectId: string
}

// iconfont处理
export class IconUpdate {
    userInfo: Info
    targetPath: string // 最终项目存放字体文件的路径
    fileList: string[] // 保留的文件
    page: any
    browser: any
    async update() {
        // 查找userinfo
        await this.preCheck()
        printMsg(green('登录进行中...'))
        // 初始化
        await this.init()
        // 登录
        await this.login()
        printMsg(green('✔ 登录成功'))
        // 下载
        await this.download()
        printMsg(green('✔ iconfont文件下载完成'))
        // 关闭浏览器
        await this.close()
        // 处理字体文件
        await this.uncompress()
        printMsg(green('✔ iconfont处理完成'))
        // 字体文件移动
        await this.copyRemove()
        printMsg(green('✔ update success'))
        printMsg(green('⚠️iconfont文件更新，请在实际开发中检验是否生效！'))
    }
    async preCheck() {
        try {
            const configPath = getFilePath(localConfig)
            printMsg(blue('Config Path: ' + configPath))
            const res = await readJsonSync(configPath)
            this.userInfo = {
                userName: res.userName,
                password: res.password,
                projectId: res.projectId,
            }
            this.targetPath = getFilePath(res?.targetPath || '_temp_font')
            this.fileList = res?.fileList || fileList
            printMsg(blue('Config Json: ' + JSON.stringify(res)))
            printMsg(green('配置读取完成'))
        } catch (error) {
            printMsg(red(error))
        }
    }

    /**
     * 初始化
     */
    async init() {
        this.browser = await puppeteer.launch({
            headless: 'new',
            timeout: TIMEOUT,
        })
        this.page = await this.browser.newPage()
        await this.page.goto(loginUrl, { waitUntil: 'networkidle0' })
    }

    async login() {
        // 根据选择器获取对象dom，输入账号密码，点击登录按钮
        await this.page.type('#userid', this.userInfo.userName, { delay: 10 })
        await this.page.type('#password', this.userInfo.password, { delay: 10 })
        await this.page.click('.mx-btn-submit')
        // 根据当前页面再也没有网络请求，判断为登录结束
        await this.page.waitForNetworkIdle()
    }

    /**
     * iconfont文件下载
     */
    async download() {
        const client = await this.page.target().createCDPSession()
        await client.send('Page.setDownloadBehavior', {
            behavior: 'allow', //允许下载请求
            downloadPath: tempFilePath, //设置下载路径
        })
        await client.send('Page.navigate', {
            url: `${downloadApi}?pid=${this.userInfo.projectId}`,
        })
        await new Promise((resolve) => setTimeout(resolve, 5000))
        // await page.waitForTimeout(5000);
    }
    /**
     * 关闭浏览器
     */
    async close() {
        await this.page.close()
        await this.browser.close()
    }
    /**
     * 处理字体文件
     */
    async uncompress() {
        await handleUncompress(tempFilePath) // 解压 download.zip
        await handleRename(tempFilePath) // 下载文件名字font_XXX_XXX，不好进行路径读取，所以重命名为iconfont
    }
    /**
     * 复制相关文件移动到目标路径
     */
    async copyRemove() {
        this.fileList.map(async (file) => {
            const _sourcePath = join(tempFilePath, 'iconfont', file)
            const _targetPath = join(this.targetPath, file)
            copySync(_sourcePath, _targetPath)
        })
        // 删除临时下载文件
        existsSync(tempFilePath) && (await remove(tempFilePath))
    }
}
