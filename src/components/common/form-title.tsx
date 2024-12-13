type FormPageType = {
    title: string;
    description: string
}

export function FormPageTitle({title, description }: FormPageType){
    return(
        <div className="pt-10 pb-10">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-customTheme-muted mt-2">{description}</p>
        </div>
    )
}