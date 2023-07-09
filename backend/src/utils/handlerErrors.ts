export function handleErrors(error: any) {
  return {
    message: error.message,
    detail: error.detail,
    errorCode: error.code,
    where: `in table '${error.table}'`
  };
}
