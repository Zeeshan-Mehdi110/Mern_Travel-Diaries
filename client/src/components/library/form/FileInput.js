import { FormHelperText, TextField } from '@mui/material'

function FileInput(props) {
  const { input, meta, selectedImage, setSelectedImage, ...rest } = props
  const { touched, error } = meta

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
      input.onChange(file)
    } else {
      setSelectedImage(null)
      input.onChange(null)
    }
  }

  return (
    <>
      <TextField
        fullWidth
        onChange={handleFileChange}
        {...rest}
        size="small"
        error={touched && error ? true : false}
        type="file"
      />
      <FormHelperText error>
        {touched && error ? error : <span>&nbsp;</span>}
      </FormHelperText>
    </>
  )
}

export default FileInput
