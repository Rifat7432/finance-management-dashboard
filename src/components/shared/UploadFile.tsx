// FileUpload.tsx
'use client'

import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function UploadFile({caption}:{caption:string}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="border-2 border-dashed border-muted rounded-2xl p-12 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-lg font-medium">{caption}</p>
          {fileName && <p className="text-sm text-muted-foreground mt-1">{fileName}</p>}
          <input
            type="file"
            accept="video/*"
            ref={inputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            className="mt-4"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Select File
          </Button>
        </div>
      </div>
    </div>
  )
}
