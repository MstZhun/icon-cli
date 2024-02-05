import { program } from 'commander'
import update from './order/update'

// 查看版本 icon-cli -v 或 icon-cli --version
/* eslint-disable @typescript-eslint/no-var-requires */
program
    .version(`${require('../package.json').version}`, '-v --version')
    .usage('<command> [options]')

// 创建项目命令 icon-cli update
//  .command('update <user-name> <password> <project_id>')
program
    .command('update')
    .description('auto handle iconfont')
    .action(async () => {
        // 创建逻辑
        await update()
    })

program.parse(process.argv)
