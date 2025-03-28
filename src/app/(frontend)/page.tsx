'use client'

import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React, { useEffect, useState } from 'react'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { LoginModal } from './components/LoginModal'
import config from '@/payload.config'
import './styles.css'

export default function HomePage() {
  const [homePageContent, setHomePageContent] = useState<any>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    // Fetch home page content
    const fetchContent = async () => {
      const response = await fetch('/api/home-page')
      const data = await response.json()
      setHomePageContent(data.docs[0])
    }

    fetchContent()

    // Handle scroll events for parallax
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper function to render rich text content
  const renderRichText = (content: any) => {
    if (!content) return null

    // If content is an array, map through it
    if (Array.isArray(content)) {
      return content.map((node: any, i: number) => {
        if (node.type === 'paragraph') {
          return <p key={i}>{node.children[0].text}</p>
        }
        if (node.type === 'heading') {
          const Tag = `h${node.level}`
          return <Tag key={i}>{node.children[0].text}</Tag>
        }
        return null
      })
    }

    // If content is an object with a root property
    if (content.root && Array.isArray(content.root.children)) {
      return content.root.children.map((node: any, i: number) => {
        if (node.type === 'paragraph') {
          return <p key={i}>{node.children[0].text}</p>
        }
        if (node.type === 'heading') {
          const Tag = `h${node.level}`
          return <Tag key={i}>{node.children[0].text}</Tag>
        }
        return null
      })
    }

    return null
  }

  return (
    <div className="home">
      {homePageContent?.heroImage && (
        <div className="hero-section">
          <div
            className="hero-image-container"
            style={{
              transform: `translateY(${scrollPosition * 0.5}px)`,
            }}
          >
            <Image
              alt={homePageContent.heroImage.alt || 'Hero Image'}
              fill
              src={homePageContent.heroImage.url}
              className="hero-image"
              priority
            />
          </div>
          <div className="hero-overlay">
            <h1>{homePageContent?.welcomeMessage || 'Welcome to our website'}</h1>
            {homePageContent?.content && (
              <div className="rich-text-content">{renderRichText(homePageContent.content)}</div>
            )}
            <div className="links">
              {homePageContent?.ctaText && homePageContent?.ctaLink && (
                <a
                  className="cta-button"
                  href={homePageContent.ctaLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {homePageContent.ctaText}
                </a>
              )}
              <a
                className="admin"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setIsLoginModalOpen(true)
                }}
              >
                Go to admin panel
              </a>
            </div>
          </div>
        </div>
      )}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We are dedicated to providing the best experience for our users.</p>
            <p>Our mission is to create innovative solutions that make a difference.</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: contact@example.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Main St, City, Country</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </footer>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}
