'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import {
  ORG_DEPARTMENTS,
  ORG_TREE_DATA,
  type OrgNode,
} from '@/lib/data/company'

export function CompanyOrgTree() {
  const [activeDept, setActiveDept] = useState<string>('all')
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Keyboard escape listener to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedNode(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedNode) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedNode])

  // Nodes hierarchy
  const founderNode = ORG_TREE_DATA.find((n) => n.level === 1)
  const cofounderNode = ORG_TREE_DATA.find((n) => n.level === 2)
  const salesNodes = ORG_TREE_DATA.filter((n) => n.level === 3)

  // Check if a node is active under current filter
  const isNodeActive = (node: OrgNode) => {
    if (activeDept === 'all') return true
    const filter = ORG_DEPARTMENTS.find((d) => d.id === activeDept)
    return filter?.dept ? node.department === filter.dept : true
  }

  return (
    <div className="org-tree-wrapper" style={{ position: 'relative', width: '100%' }}>
      {/* ── Department / Role Filter Bar ─────────────────────────────── */}
      <div
        className="org-filter-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)',
        }}
      >
        {ORG_DEPARTMENTS.map((dept) => {
          const isActive = activeDept === dept.id
          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => setActiveDept(dept.id)}
              className="org-filter-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.95rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: isActive ? 800 : 600,
                letterSpacing: '0.02em',
                background: isActive ? 'var(--burg-primary)' : 'var(--card-bg)',
                color: isActive ? '#FFFFFF' : 'var(--ink)',
                border: isActive
                  ? '1px solid var(--burg-primary)'
                  : '1px solid var(--border-light)',
                boxShadow: isActive
                  ? '0 4px 12px rgba(10, 75, 184, 0.2)'
                  : '0 2px 4px rgba(10, 75, 184, 0.04)',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {dept.label}
              {dept.dept && (
                <span
                  style={{
                    fontSize: '0.625rem',
                    opacity: isActive ? 0.9 : 0.6,
                    padding: '0.05rem 0.35rem',
                    borderRadius: '9999px',
                    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(10, 75, 184, 0.08)',
                  }}
                >
                  {ORG_TREE_DATA.filter((n) => n.department === dept.dept).length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Interactive Organization Tree Canvas ────────────────────── */}
      <div
        className="org-tree-canvas"
        style={{
          position: 'relative',
          padding: 'clamp(1.25rem, 2.5vw, 2.25rem) 1rem',
          borderRadius: '20px',
          background: 'var(--card-bg)',
          border: '1px solid var(--border-light)',
          boxShadow: '0 8px 32px rgba(10, 75, 184, 0.04)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid background pattern */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(var(--border-light) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.45,
            pointerEvents: 'none',
          }}
        />

        {/* Tree Container (Responsive on All Devices, Fits Mobile Screens with No Cutoff) */}
        <div
          className="org-tree-scroll-viewport"
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            padding: '0.5rem 0',
          }}
        >
          <div
            className="org-tree-diagram"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '1050px',
              width: '100%',
              margin: '0 auto',
              padding: '0 0.5rem',
            }}
          >
            {/* ── TOP EXECUTIVE TIER: CO-FOUNDER (LEFT SIDE) & FOUNDER (CENTERED) ── */}
            <div
              className="org-top-executive-container"
              style={{
                position: 'relative',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                marginBottom: '0.25rem',
                zIndex: 3,
              }}
            >
              {/* Left Slot: Co-founder & Strategic Investor (Far-Left Corner) */}
              <div
                className="org-investor-side-slot"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  paddingLeft: 'clamp(0.25rem, 1.5vw, 1rem)',
                  zIndex: 3,
                }}
              >
                {cofounderNode && (
                  <div
                    className="org-investor-card-wrap"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: 'rgba(10, 75, 184, 0.03)',
                      border: '1px dashed var(--border-light)',
                      borderRadius: '16px',
                      padding: '0.45rem 0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.58rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--burg-bright)',
                        background: 'rgba(56, 182, 255, 0.12)',
                        border: '1px solid rgba(56, 182, 255, 0.25)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        marginBottom: '0.25rem',
                      }}
                    >
                      Strategic Investor
                    </span>
                    <OrgTreeNode
                      node={cofounderNode}
                      isHighlighted={isNodeActive(cofounderNode)}
                      isHovered={hoveredNodeId === cofounderNode.id}
                      isDimmed={hoveredNodeId !== null && hoveredNodeId !== cofounderNode.id}
                      onHover={setHoveredNodeId}
                      onSelect={setSelectedNode}
                      size="medium"
                    />
                  </div>
                )}
              </div>

              {/* Founder & Managing Director (Exactly Centered in the Tree) */}
              <div
                className="org-founder-center"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3,
                }}
              >
                {founderNode && (
                  <OrgTreeNode
                    node={founderNode}
                    isHighlighted={isNodeActive(founderNode)}
                    isHovered={hoveredNodeId === founderNode.id}
                    isDimmed={hoveredNodeId !== null && hoveredNodeId !== founderNode.id}
                    onHover={setHoveredNodeId}
                    onSelect={setSelectedNode}
                    size="large"
                  />
                )}
              </div>

              {/* Right Placeholder for perfect symmetrical balance */}
              <div className="org-exec-right-spacer" style={{ minWidth: '0' }} />
            </div>

            {/* Vertical Connecting Line directly from Founder to the Team Branch */}
            <div
              className="org-connector-vertical"
              style={{
                width: '2px',
                height: 'clamp(1.2rem, 2.5vh, 2rem)',
                background:
                  hoveredNodeId === founderNode?.id
                    ? 'var(--burg-bright)'
                    : 'linear-gradient(to bottom, var(--burg-primary), var(--burg-bright))',
                transition: 'background 0.3s ease',
                margin: '0 auto',
              }}
            />

            {/* Fork & Branching Lines to Level 3 */}
            <div
              className="org-fork-desktop"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '980px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Horizontal Branch Line spanning all children */}
              <div
                className="org-branch-line"
                style={{
                  position: 'relative',
                  height: '2px',
                  background:
                    'linear-gradient(90deg, var(--burg-primary) 0%, var(--burg-bright) 50%, var(--burg-primary) 100%)',
                }}
              />

              {/* Dropdown vertical connectors to each level 3 node */}
              <div
                className="org-branch-dropdowns"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: 'clamp(0.65rem, 1.4vh, 1rem)',
                }}
              >
                {salesNodes.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '2px',
                      height: '100%',
                      background:
                        idx === 0 || idx === salesNodes.length - 1
                          ? 'var(--burg-primary)'
                          : 'var(--burg-bright)',
                    }}
                  />
                ))}
              </div>

              {/* ── LEVEL 3: DEPARTMENT & SALES LEADS ── */}
              <div
                className="org-level org-level--3"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${salesNodes.length}, minmax(0, 1fr))`,
                  gap: 'clamp(0.25rem, 1.2vw, 1.25rem)',
                  width: '100%',
                  marginTop: '0.15rem',
                }}
              >
                {salesNodes.map((node) => (
                  <div key={node.id} style={{ display: 'flex', justifyContent: 'center' }}>
                    <OrgTreeNode
                      node={node}
                      isHighlighted={isNodeActive(node)}
                      isHovered={hoveredNodeId === node.id}
                      isDimmed={hoveredNodeId !== null && hoveredNodeId !== node.id}
                      onHover={setHoveredNodeId}
                      onSelect={setSelectedNode}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tree Instructions Pill */}
        <div
          style={{
            marginTop: 'clamp(1rem, 2vh, 1.75rem)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: 'var(--burg-primary)',
              background: 'rgba(10, 75, 184, 0.05)',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              border: '1px solid rgba(10, 75, 184, 0.12)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--burg-primary)',
                boxShadow: '0 0 8px var(--burg-primary)',
              }}
            />
            Tap any profile node to view credentials & contact details
          </span>
        </div>
      </div>

      {/* ── PORTAL FLOATING PROFILE MODAL ────────────────────────── */}
      {mounted && selectedNode && typeof document !== 'undefined'
        ? createPortal(
          <div
            className="org-drawer-backdrop"
            onClick={() => setSelectedNode(null)}
            onTouchEnd={() => setSelectedNode(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-person-name"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999999,
              background: 'rgba(4, 15, 38, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            <aside
              ref={drawerRef}
              className="org-profile-drawer"
              onClick={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: 'min(440px, 94vw)',
                maxHeight: 'min(680px, 86vh)',
                background: 'var(--card-bg, #FFFFFF)',
                borderRadius: '24px',
                border: '1px solid var(--border-light)',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.35), 0 4px 20px rgba(10, 75, 184, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Mobile Handle Indicator */}
              <div
                className="org-mobile-handle"
                style={{
                  display: 'none',
                  width: '40px',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(0, 0, 0, 0.18)',
                  margin: '0.6rem auto 0',
                  flexShrink: 0,
                }}
              />

              {/* Card Header with Department & Close Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.25rem',
                  borderBottom: '1px solid var(--border-light)',
                  background: 'var(--card-bg)',
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span
                    style={{
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--burg-primary)',
                      background: 'rgba(10, 75, 184, 0.08)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {selectedNode.department}
                  </span>
                  <span
                    style={{
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      color: 'var(--muted)',
                    }}
                  >
                    {selectedNode.experience}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  aria-label="Close profile card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: 'rgba(10, 75, 184, 0.08)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    transition: 'all 0.2s ease',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div
                className="org-drawer-body"
                style={{
                  padding: '1.25rem 1.25rem 2rem',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  flex: 1,
                }}
              >
                {/* Compact Avatar */}
                <div
                  style={{
                    position: 'relative',
                    width: '84px',
                    height: '84px',
                    margin: '0 auto 0.75rem',
                    borderRadius: '50%',
                    padding: '3px',
                    background: 'linear-gradient(135deg, var(--burg-primary) 0%, var(--accent-cyan) 100%)',
                    boxShadow: '0 8px 20px rgba(10, 75, 184, 0.2)',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: 'var(--burg-darker)',
                    }}
                  >
                    <Image
                      src={selectedNode.portrait}
                      alt={selectedNode.name}
                      fill
                      sizes="90px"
                      style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                      priority
                    />
                  </div>
                </div>

                {/* Title & Name */}
                <div style={{ textAlign: 'center', marginBottom: '0.9rem' }}>
                  <h2
                    id="drawer-person-name"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.15rem',
                      fontWeight: 900,
                      letterSpacing: '-0.01em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      margin: '0 0 0.15rem',
                    }}
                  >
                    {selectedNode.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--burg-primary)',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {selectedNode.role}
                  </p>
                </div>

                {/* Contact Action Buttons (Compact 2-column) */}
                {selectedNode.contact && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.45rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <a
                      href={`tel:${selectedNode.contact.replace(/[^\d+]/g, '')}`}
                      className="btn-primary"
                      style={{
                        justifyContent: 'center',
                        borderRadius: '8px',
                        padding: '0.5rem 0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                      }}
                    >
                      📞 Call
                    </a>
                    <a
                      href={`https://wa.me/${selectedNode.contact.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem 0.5rem',
                        borderRadius: '8px',
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        color: '#16A34A',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                )}

                {/* Brief Bio */}
                <div style={{ marginBottom: '0.9rem' }}>
                  <h3
                    style={{
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Role Overview
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      lineHeight: 1.45,
                      color: 'var(--ink)',
                      margin: 0,
                    }}
                  >
                    {selectedNode.bio}
                  </p>
                </div>

                {/* Responsibilities */}
                <div style={{ marginBottom: '0.9rem' }}>
                  <h3
                    style={{
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Key Responsibilities
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem',
                    }}
                  >
                    {selectedNode.responsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.45rem',
                          fontSize: '0.75rem',
                          lineHeight: 1.35,
                          color: 'var(--ink)',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: 'var(--burg-primary)',
                            marginTop: '0.35rem',
                            flexShrink: 0,
                          }}
                        />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialties */}
                <div>
                  <h3
                    style={{
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Domains & Specialties
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {selectedNode.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          background: 'rgba(10, 75, 184, 0.06)',
                          border: '1px solid rgba(10, 75, 184, 0.12)',
                          color: 'var(--burg-primary)',
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )
        : null}

      {/* Responsive & Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sheetSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .org-fork-desktop {
          position: relative;
          width: 100%;
          max-width: 980px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .org-tree-diagram {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1050px;
          width: 100%;
          margin: 0 auto;
          padding: 0 0.5rem;
        }
        .org-branch-line {
          width: 84%;
        }
        .org-branch-dropdowns {
          width: 84%;
        }
        .org-node-avatar--large {
          width: clamp(68px, 6vw, 82px);
          height: clamp(68px, 6vw, 82px);
        }
        .org-node-avatar--medium {
          width: clamp(60px, 5.2vw, 74px);
          height: clamp(60px, 5.2vw, 74px);
        }
        .org-node-avatar--small {
          width: clamp(52px, 4.5vw, 64px);
          height: clamp(52px, 4.5vw, 64px);
        }
        .org-node-card-body {
          max-width: 220px;
        }
        .org-node-name {
          font-family: var(--font-sans);
          font-weight: 900;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: var(--ink);
          margin: 0 0 0.15rem;
          line-height: 1.2;
        }
        .org-node-role {
          font-family: var(--font-sans);
          font-weight: 700;
          color: var(--burg-primary);
          line-height: 1.25;
          margin: 0 0 0.25rem;
        }

        @media (max-width: 768px) {
          .org-top-executive-container {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 0.5rem !important;
            width: 100% !important;
          }
          .org-exec-right-spacer,
          .org-exec-left-spacer {
            display: none !important;
          }
          .org-investor-side-slot {
            padding-right: 0.35rem !important;
            padding-left: 0 !important;
          }
          .org-tree-scroll-viewport {
            padding: 0 !important;
          }
          .org-tree-diagram {
            width: 100% !important;
            padding: 0 !important;
          }
          .org-branch-line {
            width: 90% !important;
          }
          .org-branch-dropdowns {
            width: 90% !important;
          }
          .org-node-avatar--large {
            width: 48px !important;
            height: 48px !important;
            padding: 3px !important;
            margin-bottom: 0.25rem !important;
          }
          .org-node-avatar--medium {
            width: 42px !important;
            height: 42px !important;
            padding: 2.5px !important;
            margin-bottom: 0.25rem !important;
          }
          .org-node-avatar--small {
            width: 36px !important;
            height: 36px !important;
            padding: 2px !important;
            margin-bottom: 0.2rem !important;
          }
          .org-node-card-body {
            max-width: 100% !important;
          }
          .org-node-name {
            font-size: clamp(0.56rem, 2.2vw, 0.6875rem) !important;
            line-height: 1.1 !important;
            margin: 0 0 0.1rem !important;
            word-break: break-word;
          }
          .org-node-role {
            font-size: clamp(0.48rem, 1.8vw, 0.58rem) !important;
            line-height: 1.1 !important;
            margin: 0 !important;
            word-break: break-word;
          }
          .org-node-contact-pill {
            display: none !important;
          }
          .org-level--3 {
            gap: 2px !important;
            width: 100% !important;
          }
          .org-tree-node-wrapper {
            padding: 0.15rem 0.1rem !important;
          }
          .org-drawer-backdrop {
            align-items: flex-end !important;
            padding: 0 !important;
          }
          .org-profile-drawer {
            width: 100vw !important;
            max-width: 100vw !important;
            max-height: 80vh !important;
            border-radius: 24px 24px 0 0 !important;
            animation: sheetSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
          }
          .org-mobile-handle {
            display: block !important;
          }
          .org-drawer-body {
            padding: 1rem 1.25rem 4.5rem 1.25rem !important;
          }
        }
      `}</style>
    </div>
  )
}

/** Individual Profile Node with Circular Avatar */
interface OrgTreeNodeProps {
  node: OrgNode
  isHighlighted: boolean
  isHovered: boolean
  isDimmed: boolean
  onHover: (id: string | null) => void
  onSelect: (node: OrgNode) => void
  size?: 'large' | 'medium' | 'small'
}

function OrgTreeNode({
  node,
  isHighlighted,
  isHovered,
  isDimmed,
  onHover,
  onSelect,
  size = 'medium',
}: OrgTreeNodeProps) {
  const avatarRings = {
    large: 2.5,
    medium: 2,
    small: 1.5,
  }

  const ring = avatarRings[size]

  return (
    <div
      onClick={() => onSelect(node)}
      onTouchEnd={(e) => {
        e.preventDefault()
        onSelect(node)
      }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      tabIndex={0}
      role="button"
      aria-label={`View profile for ${node.name}, ${node.role}`}
      className="org-tree-node-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        textAlign: 'center',
        padding: '0.35rem 0.5rem',
        borderRadius: '16px',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'scale(1.06) translateY(-3px)' : 'scale(1)',
        opacity: isDimmed ? 0.38 : isHighlighted ? 1 : 0.45,
        filter: isHighlighted ? 'none' : 'grayscale(60%)',
        background: isHovered
          ? 'var(--glass-card-bg)'
          : 'transparent',
        boxShadow: isHovered
          ? '0 12px 28px rgba(10, 75, 184, 0.14), 0 3px 8px rgba(10, 75, 184, 0.06)'
          : 'none',
        outline: 'none',
        userSelect: 'none',
      }}
    >
      {/* Circular Profile Avatar */}
      <div
        className={`org-node-avatar org-node-avatar--${size}`}
        style={{
          position: 'relative',
          borderRadius: '50%',
          padding: `${ring + 2}px`,
          background: isHovered
            ? 'linear-gradient(135deg, var(--burg-primary) 0%, var(--accent-cyan) 100%)'
            : 'linear-gradient(135deg, rgba(10, 75, 184, 0.3) 0%, rgba(10, 75, 184, 0.08) 100%)',
          boxShadow: isHovered
            ? '0 0 20px rgba(10, 75, 184, 0.35)'
            : '0 3px 12px rgba(10, 75, 184, 0.08)',
          transition: 'all 0.3s ease',
          marginBottom: '0.45rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'var(--burg-darker)',
          }}
        >
          <Image
            src={node.portrait}
            alt={node.name}
            fill
            sizes="100px"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 15%',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        </div>

        {/* Pulse badge on hover */}
        {isHovered && (
          <span
            style={{
              position: 'absolute',
              bottom: '1px',
              right: '1px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--accent-green)',
              border: '2px solid var(--card-bg)',
              boxShadow: '0 0 8px var(--accent-green)',
            }}
          />
        )}
      </div>

      {/* Name and Designation Card */}
      <div className="org-node-card-body">
        <h4
          className="org-node-name"
          style={{
            fontSize: size === 'large' ? '0.9375rem' : size === 'medium' ? '0.875rem' : '0.8125rem',
            transition: 'color 0.2s ease',
          }}
        >
          {node.name}
        </h4>
        <p
          className="org-node-role"
          style={{
            fontSize: '0.6875rem',
          }}
        >
          {node.role}
        </p>

        {node.contact && (
          <span
            className="org-node-contact-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.625rem',
              fontWeight: 800,
              color: 'var(--muted)',
              background: 'rgba(10, 75, 184, 0.05)',
              padding: '0.15rem 0.45rem',
              borderRadius: '9999px',
            }}
          >
            📞 {node.contact}
          </span>
        )}
      </div>
    </div>
  )
}
