import { Door } from "@models/Door";

export function contain(arr: Door[] | any, key: string, val: boolean): boolean {
  let aux = [];
  for (let i = 0; i < arr.length; i++) { 
    if (arr[i][key] === val && arr[i]['main'] === !val) {
      aux.push(arr[i].id);
    } 
  }
    
  return (aux.length >= (arr.length) - 1);
}

export function getIndexDoorMain(doors: Door[]): number {
  return doors.findIndex((door) => door.main === true);
}