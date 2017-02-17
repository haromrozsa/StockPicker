export const CLICK_ON_SYMBOL = 'CLICK_ON_SYMBOL';

export function clickOnSymbol(choosedStock) {
  //alert(choosedStock);
  return {
    type: { type: CLICK_ON_SYMBOL },
    payload: choosedStock
  };
}
