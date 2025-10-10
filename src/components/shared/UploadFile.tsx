// FileUpload.tsx
'use client'
import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface FileUploadProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  caption: string
  accept?: string
  maxSize?: number // in bytes
  onFileSelect?: (file: File | null) => void
  disabled?: boolean
  error?: string
}

export default function FileUpload<T extends FieldValues>({
  name,
  control,
  caption,
  accept = 'video/*',
  maxSize,
  onFileSelect,
  disabled = false,
  error,
}: FileUploadProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FileUploadContent
          value={value}
          onChange={onChange}
          caption={caption}
          accept={accept}
          maxSize={maxSize}
          onFileSelect={onFileSelect}
          disabled={disabled}
          error={error}
        />
      )}
    />
  )
}

interface FileUploadContentProps {
  value: File | null
  onChange: (file: File | null) => void
  caption: string
  accept: string
  maxSize?: number
  onFileSelect?: (file: File | null) => void
  disabled: boolean
  error?: string
}

function FileUploadContent({
  value,
  onChange,
  caption,
  accept,
  maxSize,
  onFileSelect,
  disabled,
  error,
}: FileUploadContentProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(
    value instanceof File ? value.name : null
  )

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    
    if (file) {
      // Check file size if maxSize is provided
      if (maxSize && file.size > maxSize) {
        alert(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(2)}MB`)
        return
      }

      setFileName(file.name)
      onChange(file)
      onFileSelect?.(file)
    } else {
      setFileName(null)
      onChange(null)
      onFileSelect?.(null)
    }
  }

  const handleClear = () => {
    setFileName(null)
    onChange(null)
    onFileSelect?.(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div>
      <div className={`border-2 border-dashed rounded-2xl p-12 text-center ${
        error ? 'border-red-500' : 'border-muted'
      }`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium">{caption}</p>
            {fileName && (
              <p className="text-sm text-muted-foreground mt-1">{fileName}</p>
            )}
            <input
              type="file"
              accept={accept}
              ref={inputRef}
              onChange={handleFileSelect}
              className="hidden"
              disabled={disabled}
            />
            <div className="flex gap-2 justify-center mt-4">
              <Button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={disabled}
              >
                <Upload className="w-4 h-4 mr-2" />
                {fileName ? 'Change File' : 'Select File'}
              </Button>
              {fileName && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  disabled={disabled}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  )
}