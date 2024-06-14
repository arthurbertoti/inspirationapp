export type Advice = {
  slip: {
    id: number
    advice: string
  }
}

export type DailyAdvice = Advice & {
  imgUrl: string
}
