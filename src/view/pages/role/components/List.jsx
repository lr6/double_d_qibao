import api from "@/api/index.js"
import { useState, useMemo } from 'react'
import x2js from 'x2js'
import { useServeStore } from '@/store/serve.js'

import { Button } from 'antd'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-quartz.css'

import { wudaoMap, menpaiMap } from "@/config/config.js"

const xmlParser = new x2js()

function List() {
  const serveCode = useServeStore((state) => state.serveCode)

  const detailRender = (data) => {
    return <Button type="primary" onClick={ () => { getDetail(data.value) } }>详情</Button>
  }
 async function getDetail (id)  {
   const params= {
     r: Math.random()
   }
   const [err, res] = await api.getRoleDetail(id, params)
   const detailData = xmlParser.xml2js(res)
   console.log('role', detailData)
  }
  const [rowData, setRowData] = useState([])
  const [colDefs, setColDefs] = useState([
    { headerName: "名称", field: 'name' , width: 150 },
    { headerName: "等级", field: 'level' , width: 100 },
    { headerName: "门派", field: 'menpai', width: 100  },
    { headerName: "主要加点", field: 'main', width: 100  },
    { headerName: "价格", field: 'price', width: 100, pinned: 'left' },
    { headerName: "悟道", field: 'wudao', width: 100  },
    { headerName: "浮生", field: 'fusheng', width: 200  },
    { headerName: "道行", field: 'daohang', width: 200  },
    { headerName: "倍道", field: 'daohang_calc', width: 100  },
    { headerName: "战力", field: 'zhanli', width: 100  },
    { headerName: "详情", field: 'id', width: 100, pinned: 'right', cellRenderer: detailRender },
  ])

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
      serverId: serveCode,
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
    const list = []
    if(res.Data.length) {
      res.Data.forEach(v => {
        const {
          ItemName, ItemLevel, ItemTypeId, CurrentItemPrice, ItemInfoCode, TaoStandardMagnification,
          WudaoStage, TaoHtmlHelper, ZhanLiLvName, HuashenFushengluList = []
        } = v
        // const fushengText = HuashenFushengluList ? `共${HuashenFushengluList.length}个五星` : '没有五星'
        const fushengText = HuashenFushengluList ? HuashenFushengluList.length: 0
        const obj = {
          name: ItemName,
          level: ItemLevel,
          menpai: menpaiMap[ItemTypeId],
          main: '暂无',
          price: CurrentItemPrice,
          wudao: wudaoMap[WudaoStage],
          fusheng: fushengText,
          daohang: TaoHtmlHelper,
          daohang_calc: TaoStandardMagnification,
          zhanli: ZhanLiLvName,
          id: ItemInfoCode
        }
        list.push(obj)
      })
    }
    setRowData(v => list)
  }

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
      editable: true
    }
  }, [])

  return (
    <>
      <Button type="primary" onClick={ init }>Primary Button</Button>
      {/* The AG Grid component */}
      <div className="ag-theme-quartz" style={{ height: 500, width: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef} />
      </div>
    </>
  )
}

export default List
