"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRename = exports.handleDelete = exports.handleUncompress = exports.printMsg = exports.getFilePath = exports.TIMEOUT = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const compressing = require("compressing");
exports.TIMEOUT = 30000;
/**
 * 获取项目绝对路径
 * @param filePath 项目名
 */
function getFilePath(filePath) {
    return (0, path_1.resolve)(process.cwd(), filePath);
}
exports.getFilePath = getFilePath;
/**
 * 打印信息
 * @param msg 信息
 */
function printMsg(msg) {
    console.log(msg);
}
exports.printMsg = printMsg;
/**
 * 解压
 */
async function handleUncompress(filePath) {
    await compressing.zip.uncompress((0, path_1.join)(filePath, 'download.zip'), filePath);
}
exports.handleUncompress = handleUncompress;
/**
 * 删除多余文件
 */
async function handleDelete(filePath) {
    const iconfontFolder = (0, path_1.join)(filePath, 'iconfont');
    const zipFile = (0, path_1.join)(filePath, 'download.zip');
    (0, fs_extra_1.existsSync)(iconfontFolder) && (await (0, fs_extra_1.remove)(iconfontFolder));
    (0, fs_extra_1.existsSync)(zipFile) && (await (0, fs_extra_1.remove)(zipFile));
}
exports.handleDelete = handleDelete;
/**
 * 文件重命名
 */
// download.zip 解压后的名称会议font_开头，借助这个特性进行文件重命名
async function handleRename(filePath) {
    const dirs = (0, fs_extra_1.readdirSync)(filePath);
    for (const dir of dirs) {
        if (dir.startsWith('font_')) {
            await (0, fs_extra_1.rename)((0, path_1.join)(filePath, dir), (0, path_1.join)(filePath, 'iconfont'));
            break;
        }
    }
}
exports.handleRename = handleRename;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBb0M7QUFDcEMsdUNBQWtFO0FBQ2xFLDJDQUEwQztBQUU3QixRQUFBLE9BQU8sR0FBRyxLQUFLLENBQUE7QUFFNUI7OztHQUdHO0FBQ0gsU0FBZ0IsV0FBVyxDQUFDLFFBQWdCO0lBQ3hDLE9BQU8sSUFBQSxjQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQzNDLENBQUM7QUFGRCxrQ0FFQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxHQUFXO0lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDcEIsQ0FBQztBQUZELDRCQUVDO0FBRUQ7O0dBRUc7QUFDSSxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsUUFBZ0I7SUFDbkQsTUFBTSxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFBLFdBQUksRUFBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDOUUsQ0FBQztBQUZELDRDQUVDO0FBRUQ7O0dBRUc7QUFDSSxLQUFLLFVBQVUsWUFBWSxDQUFDLFFBQWdCO0lBQy9DLE1BQU0sY0FBYyxHQUFHLElBQUEsV0FBSSxFQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUNqRCxNQUFNLE9BQU8sR0FBRyxJQUFBLFdBQUksRUFBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDOUMsSUFBQSxxQkFBVSxFQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFBLGlCQUFNLEVBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUM1RCxJQUFBLHFCQUFVLEVBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUEsaUJBQU0sRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQ2xELENBQUM7QUFMRCxvQ0FLQztBQUVEOztHQUVHO0FBQ0gsNkNBQTZDO0FBQ3RDLEtBQUssVUFBVSxZQUFZLENBQUMsUUFBUTtJQUN2QyxNQUFNLElBQUksR0FBRyxJQUFBLHNCQUFXLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDbEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDcEIsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sSUFBQSxpQkFBTSxFQUFDLElBQUEsV0FBSSxFQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtZQUM3RCxNQUFLO1NBQ1I7S0FDSjtBQUNMLENBQUM7QUFSRCxvQ0FRQyJ9