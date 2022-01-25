import { Pipe, PipeTransform } from '@angular/core'
import { Employee } from '../model/employee'

@Pipe({
  name: 'nestedParam'
})
export class NestedParamPipe implements PipeTransform{
  transform(empJson: {[index: string]: string}, param: string) {
    let res = {}
    let nestedParams = param.split('.')
    nestedParams.forEach(p => {
      res = empJson[p]
      empJson = res
    })
    console.log(empJson)
    return empJson
  }
}