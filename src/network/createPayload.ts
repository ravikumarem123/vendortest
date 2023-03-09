const getJCLedgerPayload = (
    businessId: string,
    pageNumber: number,
    pageSize: number = 10
) => {
    return `businessId=${businessId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
};

export { getJCLedgerPayload };
