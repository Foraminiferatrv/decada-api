import S from 'fluent-json-schema'

export const user = S.object().prop('email', S.string())
