const yaml = require('js-yaml');
const fs = require('fs');

exports.yamlToJson = function (fileName) {
  try {
    return yaml.load(fs.readFileSync(`${fileName}.yaml`, 'utf8'));
  } catch (e) {
    return e
  }
}

exports.generate = function (filters) {
  console.log('import React from "react"')
  console.log('import { useForm } from "react-hook-form"')
  console.log(`
export default function Filter(props) {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = data => props.updateAction(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
`)
  filters.forEach(filter => {
    if (filter.type === 'text')
      console.log(`
      <input
        type="${filter.type}"
        {...register('${filter.name}')}
        defaultValue={${filter.defaultValue}}
      />
      `)
    else if (filter.type === 'select')
      console.log(`
      <select {...register('${filter.name}')}>
        {options.map(value => (
          <option key={${filter.name}} value={${filter.name}}>
            {value}
          </option>
        ))}
      </select>`)
  })
  console.log(`
    </form>
  )
}
  `)
}
