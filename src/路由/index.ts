import {ComponentType} from 'react'
import 教案 from './教案'
import 一览 from './一览'
import 打卡 from './打卡'
import 讲义 from './讲义'

export default Object.entries<ComponentType>({教案, 讲义, 打卡, 一览})
