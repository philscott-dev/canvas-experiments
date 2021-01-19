import { BaseNode } from 'types'

export const ingest: BaseNode = {
  id: '0',
  type: 'action',
  name: 'ingest',
  displayName: 'Ingest',
  colorPrimary: '#1DC971',
  colorSecondary: '#117944',
}

export const aggregate: BaseNode = {
  id: '1',
  type: 'action',
  name: 'aggregate',
  displayName: 'Aggregate',
  colorPrimary: '#FF00B8',
  colorSecondary: '#880062',
}

export const script: BaseNode = {
  id: '2',
  type: 'transform',
  name: 'script',
  displayName: 'Script',
  colorPrimary: '#4004EB',
  colorSecondary: '#25008F',
}

export default [ingest, aggregate, script]
