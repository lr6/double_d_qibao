import api from "@/api/index.js"
import { useState, useEffect } from 'react'

import { Select } from 'antd'

let serverList = []

function Area() {
  console.log('render area')
  const [areaList, setAreaList] = useState([])
  const [gameList, setGameList] = useState([])
  const [areaVal, setAreaVal] = useState('')
  const [gameVal, setGameVal] = useState('')

  async function getList() {
    const params = { r: Math.random() }
    const [err, res] = await api.getAreaList(params)
    const [errGame, resGame] = await api.getGameList(params)
    setAreaList(v => res.Result)
    setAreaVal(v => res.Result[0].code)
    serverList = resGame.Data
  }
  const onChange = (value) => {
    setAreaVal(v => value)
  }
  const onGameChange = (value) => {
    setGameVal(v => value)
  }

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    console.log('areaVal 更新了', areaVal)
    setGameList(v => serverList.filter(v => v.AreaCode == areaVal))
  }, [areaVal])

  useEffect(() => {
    console.log('gameList 更新了', gameList)
    setGameVal(v => gameList[0] ? gameList[0].ServerCode : '')
  }, [gameList])

  return (
    <>
      <div>
        <Select
          showSearch
          value={areaVal}
          style={{width: 150, marginRight: 15}}
          optionFilterProp="label"
          fieldNames={{ label: 'areaName', value: 'code' }}
          onChange={onChange}
          options={areaList}
        />

        <Select
          showSearch
          value={gameVal}
          style={{width: 150}}
          optionFilterProp="label"
          fieldNames={{ label: 'ServerName', value: 'ServerCode' }}
          onChange={onGameChange}
          options={gameList}
        />
      </div>
    </>
  )
}

export default Area
