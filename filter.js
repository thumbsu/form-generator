import React from "react"
import { useForm } from "react-hook-form"
import { connect } from "react-redux"

export default function Filter(props) {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = data => props.updateAction(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("id")} defaultValue="" placeholder="결제 id를 입력하세요" />
          <select {...register("status")}>
              <option key="0" value="all">
                all
              </option>
              <option key="1" value="paid">
                paid
              </option>
              <option key="2" value="free">
                free
              </option>
          </select>
      <input type="submit" />
    </form>
  )
}
