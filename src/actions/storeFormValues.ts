'use server'

export async function storeFormValues(formValues: unknown) {
  console.log(`Form values: ${JSON.stringify(formValues, null, 4)}`);
}
