import { callToActions, impactfulPhrases, relevantHashtags } from "@/consts"

export const handleShareContent = (text: string) => {
  const getRandom = (maxValue: number) => Math.floor(Math.random() * maxValue)

  const randomImpactfulPhrase =
    impactfulPhrases[getRandom(impactfulPhrases.length)]

  const randomCTA = callToActions[getRandom(callToActions.length)]

  const randomRelevantHashtag1 =
    relevantHashtags[getRandom(relevantHashtags.length)]

  const relevantHashtagsWithoutRandomRelevantHashtag1 =
    relevantHashtags.toSpliced(
      relevantHashtags.indexOf(randomRelevantHashtag1),
      1
    )

  const randomRelevantHashtag2 =
    relevantHashtags[
      getRandom(relevantHashtagsWithoutRandomRelevantHashtag1.length)
    ]

  return `${randomImpactfulPhrase}: "${text}"\n${randomCTA}\n${randomRelevantHashtag1} ${randomRelevantHashtag2}`
}
