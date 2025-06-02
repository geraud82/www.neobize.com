import { useState, useRef, useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Upload, Image, Link, Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Code, Quote } from 'lucide-react'
import { uploadImage } from '../services/api'

const RichTextEditor = ({ value, onChange, placeholder = "Écrivez votre contenu ici...", height = "400px" }) => {
  const [isUploading, setIsUploading] = useState(false)
  const quillRef = useRef(null)
  const fileInputRef = useRef(null)

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
  }), [])

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

  // Gestionnaire d'upload d'image
  async function handleImageUpload() {
    fileInputRef.current?.click()
  }

  // Gestionnaire de sélection de fichier
  const handleFileSelect = async (e) => {
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
        quill.insertEmbed(range.index, 'image', imageUrl)
        quill.setSelection(range.index + 1)
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
  }

  // Gestionnaire de changement de contenu
  const handleChange = (content, delta, source, editor) => {
    onChange(content)
  }

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
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={editorStyle}
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

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        .rich-text-editor .ql-editor {
          min-height: ${height};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-bottom: none;
          background: #f9fafb;
        }
        
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-top: none;
        }
        
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
        
        .rich-text-editor .ql-editor h1 {
          font-size: 2em;
          font-weight: 700;
          margin: 0.67em 0;
        }
        
        .rich-text-editor .ql-editor h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 0.75em 0;
        }
        
        .rich-text-editor .ql-editor h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 0.83em 0;
        }
        
        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .rich-text-editor .ql-editor pre {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          padding: 1rem;
          overflow-x: auto;
        }
        
        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
          margin: 1rem 0;
        }
        
        .rich-text-editor .ql-editor a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        .rich-text-editor .ql-editor a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  )
}

export default RichTextEditor
