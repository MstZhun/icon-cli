"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const update_1 = require("./order/update");
// 查看版本 icon-cli -v 或 icon-cli --version
/* eslint-disable @typescript-eslint/no-var-requires */
commander_1.program
    .version(`${require('../package.json').version}`, '-v --version')
    .usage('<command> [options]');
// 创建项目命令 icon-cli update
//  .command('update <user-name> <password> <project_id>')
commander_1.program
    .command('update')
    .description('auto handle iconfont')
    .action(async () => {
    // 创建逻辑
    await (0, update_1.default)();
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBbUM7QUFDbkMsMkNBQW1DO0FBRW5DLHdDQUF3QztBQUN4Qyx1REFBdUQ7QUFDdkQsbUJBQU87S0FDRixPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxjQUFjLENBQUM7S0FDaEUsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFFakMseUJBQXlCO0FBQ3pCLDBEQUEwRDtBQUMxRCxtQkFBTztLQUNGLE9BQU8sQ0FBQyxRQUFRLENBQUM7S0FDakIsV0FBVyxDQUFDLHNCQUFzQixDQUFDO0tBQ25DLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNmLE9BQU87SUFDUCxNQUFNLElBQUEsZ0JBQU0sR0FBRSxDQUFBO0FBQ2xCLENBQUMsQ0FBQyxDQUFBO0FBRU4sbUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBIn0=