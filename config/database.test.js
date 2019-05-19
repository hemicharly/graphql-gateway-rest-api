/* globals it */

import { expect } from 'chai'
import db from './database'

it('db must be a function', () => {
  expect(db).to.be.a('function')
})

it('db.raw must be a function', () => {
  expect(db.raw).to.be.a('function')
})

it('db.raw() must connect to database', done => (
  db.raw('SELECT 1+1 AS RESULT').then(() => {
    db.destroy().then(() => done())
  })
))
