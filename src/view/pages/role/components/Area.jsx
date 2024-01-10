import { useState, useEffect } from 'react'
import { useServeStore } from '@/store/serve.js'
import api from "@/api/index.js"

import { Select } from 'antd'

let serverList = []

function Area() {
  const serveCode = useServeStore((state) => state.serveCode)
  const setServeCode = useServeStore((state) => state.setServeCode)

  const [areaList, setAreaList] = useState([])
  const [gameList, setGameList] = useState([])
  const [areaVal, setAreaVal] = useState('')

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
    setServeCode(value)
  }

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    setGameList(v => serverList.filter(v => v.AreaCode == areaVal))
  }, [areaVal])

  useEffect(() => {
    setServeCode(gameList[0] ? gameList[0].ServerCode : '')
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
          value={serveCode}
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
