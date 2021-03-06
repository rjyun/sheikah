import { RadonMarkupInterpreter } from '@/radon'
const { drMarkup, drMir } = require('./dataset')

describe('RadonMarkupInterpreter', () => {
  it('converts MIR to markup correctly', () => {
    const rmi = new RadonMarkupInterpreter(drMir.radRequest)

    expect(rmi.getMarkup()).toMatchObject(drMarkup)
  })

  it.only('update correctly by id', () => {
    const rmi = new RadonMarkupInterpreter(drMir.radRequest)
    rmi.updateElement(1, 'hash')
    expect(rmi.getMarkup()).toMatchObject(drMarkup)
  })

  it('markupToRadon', () => {
    const { drMir } = require('./dataset')
    const rmi = new RadonMarkupInterpreter(drMir.radRequest)

    expect(rmi.getMir()).toMatchObject(drMir.radRequest)
  })
})
