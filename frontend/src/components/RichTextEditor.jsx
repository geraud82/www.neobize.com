import { useState, useRef, useMemo, useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Upload, Image, Link, Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Code, Quote } from 'lucide-react'
import { uploadImage } from '../services/api'

const RichTextEditor = ({ value, onChange, placeholder = "Écrivez votre contenu ici...", height = "400px" }) => {
  const [isUploading, setIsUploading] = useState(false)
  const quillRef = useRef(null)
  const fileInputRef = useRef(null)
  
  // Ensure value is always a string and handle null/undefined safely
  const safeValue = useMemo(() => {
    if (value === null || value === undefined) {
      return ''
    }
    if (typeof value !== 'string') {
      return String(value)
    }
    return value
  }, [value])

  // Gestionnaire d'upload d'image
  const handleImageUpload = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  // Configuration des modules Quill
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }, { 'align': [] }],
        ['link', 'image', 'video', 'formula'],
        ['blockquote', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: handleImageUpload
      }
    },
    clipboard: {
      matchVisual: false
    }
  }), [handleImageUpload])

  // Formats supportés
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'link', 'image', 'video', 'formula',
    'blockquote', 'code-block'
  ]

  // Gestionnaire de sélection de fichier
  const handleFileSelect = useCallback(async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('La taille de l\'image ne doit pas dépasser 5MB')
      return
    }

    setIsUploading(true)
    try {
      const imageUrl = await uploadImage(file)
      
      // Insérer l'image dans l'éditeur
      const quill = quillRef.current?.getEditor()
      if (quill) {
        const range = quill.getSelection(true)
        if (range && typeof range.index === 'number') {
          quill.insertEmbed(range.index, 'image', imageUrl)
          quill.setSelection(range.index + 1)
        }
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error)
      alert('Erreur lors du téléchargement de l\'image: ' + error.message)
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [])

  // Gestionnaire de changement de contenu avec protection contre les valeurs null
  const handleChange = useCallback((content, delta, source, editor) => {
    // Ensure content is never null or undefined
    const safeContent = content || ''
    if (onChange) {
      onChange(safeContent)
    }
  }, [onChange])

  // Styles personnalisés pour l'éditeur
  const editorStyle = {
    height: height,
    backgroundColor: 'white'
  }

  return (
    <div className="rich-text-editor">
      {/* Input file caché pour l'upload d'images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Indicateur de chargement */}
      {isUploading && (
        <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center text-blue-700">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
          Téléchargement de l'image en cours...
        </div>
      )}

      {/* Éditeur Quill */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={safeValue}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={editorStyle}
          preserveWhitespace={false}
          readOnly={false}
          bounds="self"
        />
      </div>

      {/* Barre d'outils personnalisée avec raccourcis */}
      <div className="mt-2 p-2 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Bold size={12} />
            <span>Ctrl+B</span>
          </div>
          <div className="flex items-center gap-1">
            <Italic size={12} />
            <span>Ctrl+I</span>
          </div>
          <div className="flex items-center gap-1">
            <Link size={12} />
            <span>Ctrl+K</span>
          </div>
          <div className="flex items-center gap-1">
            <Image size={12} />
            <span>Cliquez sur l'icône image dans la barre d'outils</span>
          </div>
          <div className="flex items-center gap-1">
            <List size={12} />
            <span>Ctrl+Shift+7/8</span>
          </div>
          <div className="flex items-center gap-1">
            <Quote size={12} />
            <span>Ctrl+Shift+9</span>
          </div>
          <div className="flex items-center gap-1">
            <Code size={12} />
            <span>Ctrl+`</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RichTextEditor
