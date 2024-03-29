import { Container } from '@mantine/core'
import Head from 'next/head'
import React from 'react'
import metaData from '../data/metaData'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <Container fluid p={0}>
      {children}
    </Container>
  )
}
