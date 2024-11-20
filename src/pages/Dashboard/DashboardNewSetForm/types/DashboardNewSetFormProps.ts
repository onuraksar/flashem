export interface DashboardNewSetFormProps {
    // todo: keep this data type in a model:
    data?: {
        id: string,
        name: string,
        categoryId: string,
        categoryName: string
    }
    refreshEvent?: () => void
}