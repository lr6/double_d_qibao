import api from "@/api"
import { useState } from 'react'
import './App.css'

import { Button } from 'antd'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-quartz.css'

const wudaoMap = {
  '凝丹': '1',
  '炼气': '2',
  '塑道': '3',
  '凝魂': '4',
  '混元': '5',
  '元丹': '6',
  '虚神': '7',
  '归宗': '8',
  '入神': '9',
  '劫变': '10',
  '仙道': '11',
  '仙尊': '12'
}

const menpaiMap = {
  '501': '金系',
  '502': '木系',
  '503': '水系',
  '504': '火系',
  '505': '土系',
  '506': '刀客|新金',
  '507': '灵兽|新木',
  '508': '蛟龙|新水',
  '509': '风翅|新火',
  '510': '蛮荒|新土',
  '511': '孔雀',
  '512': '玉兔'
}

function App() {

  const [rowData, setRowData] = useState([])

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { headerName: "名称", field: 'name' , width: 150 },
    { headerName: "等级", field: 'level' , width: 100 },
    { headerName: "门派", field: 'menpai', width: 100  },
    { headerName: "主要加点", field: 'main', width: 100  },
    { headerName: "价格", field: 'price', width: 100  },
    { headerName: "悟道", field: 'wudao', width: 100  },
    { headerName: "浮生", field: 'fusheng', width: 200  },
    { headerName: "道行", field: 'daohang', width: 200  },
    { headerName: "战力", field: 'zhanli', width: 100  }
  ]);

  async function init() {
    const params = {
      sex: '不限',
      mainPoint: 0,
      zhanLiLv: '不限',
      level:'',
      wudaoStage: '不限',
      minTao:'',
      maxTao:'',
      minCon:'',
      maxCon:'',
      minWiz:'',
      maxWiz:'',
      minStr:'',
      maxStr:'',
      minDex:'',
      maxDex:'',
      minImmortal:'',
      maxImmortal:'',
      minMagic:'',
      maxMagic:'',
      minPrice:'51',
      maxPrice:'1000000',
      minTaoStandardMagnification:'',
      maxTaoStandardMagnification:'',
      huashenFushengluName:'',
      HuashenFushenglu: '不限',
      serverId: 37,
      r: Math.random(),
      time:'',
      orderState:'',
      readed:'',
      itemTypeID: 0,
      state: 0,
      order: 0,
      pageIndex: 1,
      pageSize: 1500,
      itemState:'',
      keyWord: ''
    }
    const [err, res] = await api.getRoleList(params)
    console.log(err, res)
    const list = []
    if(res.Data.length) {
      res.Data.forEach(v => {
        const {
          ItemName, ItemLevel, ItemTypeId, CurrentItemPrice,
          WudaoStage, TaoHtmlHelper, ZhanLiLvName, HuashenFushengluList = []
        } = v
        const fushengText = HuashenFushengluList ? `共${HuashenFushengluList.length}个五星` : '没有五星'
        const obj = {
          name: ItemName,
          level: ItemLevel,
          menpai: menpaiMap[ItemTypeId],
          main: '暂无',
          price: CurrentItemPrice,
          wudao: wudaoMap[WudaoStage],
          fusheng: fushengText,
          daohang: TaoHtmlHelper,
          zhanli: ZhanLiLvName,
        }
        list.push(obj)
      })
    }
    setRowData(v => list)
  }

  return (
    <>
      <Button type="primary" onClick={ init }>Primary Button</Button>
      <div className="ag-theme-quartz" style={{ height: 500, width: 1200 }}>
        {/* The AG Grid component */}
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </>
  )
}

export default App
