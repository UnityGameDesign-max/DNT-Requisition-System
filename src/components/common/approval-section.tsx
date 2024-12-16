
type ApprovalKeyValue = {
    keys: string;
    value?: string | boolean;
}

export function ApprovalDetailSection({ keys, value } : ApprovalKeyValue){

    if(!value) return null;

    return(
        <div className="text-left">
            <p className="text-customTheme-muted text-sm">{keys}</p>
            <p>{value === true ? 'available' : value}</p>
        </div>
    )
}