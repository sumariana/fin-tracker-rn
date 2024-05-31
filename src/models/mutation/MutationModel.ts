export interface MutationType{
    id: number
    name: string
}

export interface MutationModel{
    id: number
    notes: string
    image: string
    date: string
    value: number
    category: MutationType
    mutation_type: MutationType //expense or income
    user_id: number //the mutation owner
}