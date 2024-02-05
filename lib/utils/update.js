"use strict";
/**
 * update 命令需要用到的所有方法
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconUpdate = void 0;
const chalk_1 = require("chalk");
const common_1 = require("./common");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const puppeteer = require("puppeteer");
// 本地配置文件名称
const localConfig = 'icon-local.json';
// 图标下载临时文件路径
const tempFilePath = (0, common_1.getFilePath)('_temp_iconfont');
// 需要copy的字体文件
const fileList = [
    'iconfont.css',
    'iconfont.ttf',
    'iconfont.woff',
    'iconfont.woff2',
];
// 登录地址
const loginUrl = 'https://www.iconfont.cn/login';
// 下载地址
const downloadApi = 'https://www.iconfont.cn/api/project/download.zip';
// iconfont处理
class IconUpdate {
    async update() {
        // 查找userinfo
        await this.preCheck();
        (0, common_1.printMsg)((0, chalk_1.green)('登录进行中...'));
        // 初始化
        await this.init();
        // 登录
        await this.login();
        (0, common_1.printMsg)((0, chalk_1.green)('✔ 登录成功'));
        // 下载
        await this.download();
        (0, common_1.printMsg)((0, chalk_1.green)('✔ iconfont文件下载完成'));
        // 关闭浏览器
        await this.close();
        // 处理字体文件
        await this.uncompress();
        (0, common_1.printMsg)((0, chalk_1.green)('✔ iconfont处理完成'));
        // 字体文件移动
        await this.copyRemove();
        (0, common_1.printMsg)((0, chalk_1.green)('✔ update success'));
        (0, common_1.printMsg)((0, chalk_1.green)('⚠️iconfont文件更新，请在实际开发中检验是否生效！'));
    }
    async preCheck() {
        try {
            const configPath = (0, common_1.getFilePath)(localConfig);
            (0, common_1.printMsg)((0, chalk_1.blue)('Config Path: ' + configPath));
            const res = await (0, fs_extra_1.readJsonSync)(configPath);
            this.userInfo = {
                userName: res.userName,
                password: res.password,
                projectId: res.projectId,
            };
            this.targetPath = (0, common_1.getFilePath)((res === null || res === void 0 ? void 0 : res.targetPath) || '_temp_font');
            this.fileList = (res === null || res === void 0 ? void 0 : res.fileList) || fileList;
            (0, common_1.printMsg)((0, chalk_1.blue)('Config Json: ' + JSON.stringify(res)));
            (0, common_1.printMsg)((0, chalk_1.green)('配置读取完成'));
        }
        catch (error) {
            (0, common_1.printMsg)((0, chalk_1.red)(error));
        }
    }
    /**
     * 初始化
     */
    async init() {
        this.browser = await puppeteer.launch({
            headless: 'new',
            timeout: common_1.TIMEOUT,
        });
        this.page = await this.browser.newPage();
        await this.page.goto(loginUrl, { waitUntil: 'networkidle0' });
    }
    async login() {
        // 根据选择器获取对象dom，输入账号密码，点击登录按钮
        await this.page.type('#userid', this.userInfo.userName, { delay: 10 });
        await this.page.type('#password', this.userInfo.password, { delay: 10 });
        await this.page.click('.mx-btn-submit');
        // 根据当前页面再也没有网络请求，判断为登录结束
        await this.page.waitForNetworkIdle();
    }
    /**
     * iconfont文件下载
     */
    async download() {
        const client = await this.page.target().createCDPSession();
        await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: tempFilePath, //设置下载路径
        });
        await client.send('Page.navigate', {
            url: `${downloadApi}?pid=${this.userInfo.projectId}`,
        });
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // await page.waitForTimeout(5000);
    }
    /**
     * 关闭浏览器
     */
    async close() {
        await this.page.close();
        await this.browser.close();
    }
    /**
     * 处理字体文件
     */
    async uncompress() {
        await (0, common_1.handleUncompress)(tempFilePath); // 解压 download.zip
        await (0, common_1.handleRename)(tempFilePath); // 下载文件名字font_XXX_XXX，不好进行路径读取，所以重命名为iconfont
    }
    /**
     * 复制相关文件移动到目标路径
     */
    async copyRemove() {
        this.fileList.map(async (file) => {
            const _sourcePath = (0, path_1.join)(tempFilePath, 'iconfont', file);
            const _targetPath = (0, path_1.join)(this.targetPath, file);
            (0, fs_extra_1.copySync)(_sourcePath, _targetPath);
        });
        // 删除临时下载文件
        (0, fs_extra_1.existsSync)(tempFilePath) && (await (0, fs_extra_1.remove)(tempFilePath));
    }
}
exports.IconUpdate = IconUpdate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUVILGlDQUF3QztBQUN4QyxxQ0FNaUI7QUFDakIsdUNBQXFFO0FBQ3JFLCtCQUEyQjtBQUMzQix1Q0FBc0M7QUFFdEMsV0FBVztBQUNYLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFBO0FBQ3JDLGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxJQUFBLG9CQUFXLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUNsRCxjQUFjO0FBQ2QsTUFBTSxRQUFRLEdBQUc7SUFDYixjQUFjO0lBQ2QsY0FBYztJQUNkLGVBQWU7SUFDZixnQkFBZ0I7Q0FDbkIsQ0FBQTtBQUNELE9BQU87QUFDUCxNQUFNLFFBQVEsR0FBRywrQkFBK0IsQ0FBQTtBQUNoRCxPQUFPO0FBQ1AsTUFBTSxXQUFXLEdBQUcsa0RBQWtELENBQUE7QUFRdEUsYUFBYTtBQUNiLE1BQWEsVUFBVTtJQU1uQixLQUFLLENBQUMsTUFBTTtRQUNSLGFBQWE7UUFDYixNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNyQixJQUFBLGlCQUFRLEVBQUMsSUFBQSxhQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtRQUMzQixNQUFNO1FBQ04sTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDakIsS0FBSztRQUNMLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2xCLElBQUEsaUJBQVEsRUFBQyxJQUFBLGFBQUssRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQ3pCLEtBQUs7UUFDTCxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNyQixJQUFBLGlCQUFRLEVBQUMsSUFBQSxhQUFLLEVBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO1FBQ25DLFFBQVE7UUFDUixNQUFNLElBQUksQ0FBQyxL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