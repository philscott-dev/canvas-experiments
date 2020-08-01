import { BaseNode } from './types'

export const virustotal: BaseNode = {
  id: '0',
  type: 'service',
  name: 'virustotal',
  displayName: 'VirusTotal',
  colorPrimary: '#1DC971',
  colorSecondary: '#117944',
}

export const domainTools: BaseNode = {
  id: '1',
  type: 'service',
  name: 'domaintools',
  displayName: 'DomainTools',
  colorPrimary: '#FF00B8',
  colorSecondary: '#880062',
}

export const farsight: BaseNode = {
  id: '2',
  type: 'service',
  name: 'farsight',
  displayName: 'Farsight',
  colorPrimary: '#0253B1',
  colorSecondary: '#002E63',
}

export const recordedFuture: BaseNode = {
  id: '3',
  type: 'service',
  name: 'recorded_future',
  displayName: 'RecordedFuture',
  colorPrimary: '#FF8A00',
  colorSecondary: '#703C00',
}

export const threatstream: BaseNode = {
  id: '4',
  type: 'service',
  name: 'threatstream',
  displayName: 'Threatstream',
  colorPrimary: '#9E00FF',
  colorSecondary: '#540087',
}

export const urlHaus: BaseNode = {
  id: '5',
  type: 'service',
  name: 'urlhaus',
  displayName: 'URLhaus',
  colorPrimary: '#0287B1',
  colorSecondary: '#00526B',
}

export const spur: BaseNode = {
  id: '6',
  type: 'service',
  name: 'spur',
  displayName: 'Spur',
  colorPrimary: '#222832',
  colorSecondary: '#545454',
}

export const phishlabs: BaseNode = {
  id: '7',
  type: 'service',
  name: 'phishlabs',
  displayName: 'PhishLabs',
  colorPrimary: '#4004EB',
  colorSecondary: '#25008F',
}

export const riskIQ: BaseNode = {
  id: '8',
  type: 'service',
  name: 'riskiq',
  displayName: 'RiskIQ',
  colorPrimary: '#00F0FF',
  colorSecondary: '#126368',
}

export const virustotalFileFeed: BaseNode = {
  id: '9',
  type: 'service',
  name: 'virustotal_file_feed',
  displayName: 'VirusTotal File Feed',
  colorPrimary: '#D2E033',
  colorSecondary: '#8C952B',
}

export const hyas: BaseNode = {
  id: '10',
  type: 'service',
  name: 'hyas',
  displayName: 'HYAS',
  colorPrimary: '#FD5A51',
  colorSecondary: '#882D28',
}

export default [
  virustotal,
  domainTools,
  farsight,
  recordedFuture,
  threatstream,
  urlHaus,
  spur,
  phishlabs,
  riskIQ,
  virustotalFileFeed,
  hyas,
]
