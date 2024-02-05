/**
 * update 命令需要用到的所有方法
 */
interface Info {
    userName: string;
    password: string;
    projectId: string;
}
export declare class IconUpdate {
    userInfo: Info;
    targetPath: string;
    fileList: string[];
    page: any;
    browser: any;
    update(): Promise<void>;
    preCheck(): Promise<void>;
    /**
     * 初始化
     */
    init(): Promise<void>;
    login(): Promise<void>;
    /**
     * iconfont文件下载
     */
    download(): Promise<void>;
    /**
     * 关闭浏览器
     */
    close(): Promise<void>;
    /**
     * 处理字体文件
     */
    uncompress(): Promise<void>;
    /**
     * 复制相关文件移动到目标路径
     */
    copyRemove(): Promise<void>;
}
export {};
