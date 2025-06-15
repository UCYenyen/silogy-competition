"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Mock quest data for UI demo
const mockQuestData = {
  id: 1,
  title: "Bersih-bersih Lingkungan Gang Banana",
  description: "Kegiatan gotong royong untuk membersihkan lingkungan Gang Banana yang sudah lama tidak dibersihkan. Diperlukan bantuan dari warga sekitar untuk membersihkan saluran air, mengangkat sampah, dan menata kembali area publik agar nyaman digunakan bersama.",
  location: "Gang Banana, Surabaya Timur",
  urgencyLevel: "High",
  status: "Open",
  confirmationStatus: "accepted",
  dueDate: "2024-02-15",
  createdAt: "2024-01-20",
  image: "/images/gotong-royong-1.svg",
  requester: {
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "081234567890"
  },
  assignedStaff: null, // Will be shown if status is "Ongoing"
  rewardAmount: 90000,
  rewardType: "paid"
};

// Helper function to get urgency color
const getUrgencyColor = (urgency: string) => {
  switch (urgency?.toLowerCase()) {
    case 'urgent':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'open':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ongoing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function PermintaanDetailPage() {
  const navRef = useRef<HTMLElement>(null);
  const [user, setUser] = useState<object | null>(null);

  // Navbar animation logic
  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;
    
    gsap.set(navbar, { 
      y: 0,
      backgroundColor: "rgba(60, 68, 87, 0.9)"
    });

    let lastScrollY = window.scrollY;
    let accumulatedUp = 0;
    const threshold = 60;

    ScrollTrigger.create({
      start: "top -80",
      end: "max",
      onUpdate: (self) => {
        const currentScrollY = window.scrollY;
        const direction = self.direction;

        if (direction === -1) {
          accumulatedUp += lastScrollY - currentScrollY;
          if (accumulatedUp > threshold && currentScrollY > threshold) {
            gsap.killTweensOf(navbar);
            gsap.to(navbar, {
              y: 0,
              duration: 0.5,
              ease: "expo.out"
            });
            accumulatedUp = 0;
          }
        } else {
          accumulatedUp = 0;
          gsap.killTweensOf(navbar);
          gsap.to(navbar, {
            y: -100,
            duration: 0.5,
            ease: "expo.in"
          });
        }
        lastScrollY = currentScrollY;
      }
    });

    ScrollTrigger.create({
      start: "top top",
      end: "80px",
      onEnter: () => {
        gsap.killTweensOf(navbar);
        gsap.to(navbar, {
          y: 0,
          duration: 0,
          ease: "linear"
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Mock user state
  useEffect(() => {
    // Simulate logged in user for demo
    setUser({ name: "Demo User" });
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  const handleTakeQuest = () => {
    alert("Fitur ambil tugas akan tersedia setelah terintegrasi dengan backend!");
  };

  return (
    <div className="min-h-screen bg-[#EDEDED]">
      {/* Integrated Navbar */}
      <nav 
        ref={navRef}
        className="fixed z-[200] w-full p-6 md:p-8 px-16 flex items-center justify-between text-white text-lg md:text-xl font-bold transition-all duration-100 filter"
        style={{ backgroundColor: "rgba(60, 68, 87, 0.9)" }}
      >
        <div className="flex items-center gap-4 shadow-xs">
          <Link href="/" className="font-heading text-4xl">TolongYuk!</Link>
        </div>
        <div className="hidden md:flex items-center gap-4 shadow-xs">
          <Link href="/semua-permintaan" className="hover:underline">Permintaan</Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center justify-center px-2 py-1 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition min-w-10 min-h-10"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" fill="#163760" />
                    <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#163760" />
                  </svg>
                </span>
              </Link>
            </>
          ) : (
            <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
              <Link href="/login" className="hover:underline px-4">Login</Link>
            </div>
          )}
        </div>
        {/* Mobile menu button */}
        <div className="flex flex-col gap-1.5 md:hidden cursor-pointer">
          <div className="w-10 bg-white h-1.5"></div>
          <div className="w-10 bg-white h-1.5"></div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8 pt-32">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Side - Large Image */}
            <div className="lg:w-1/2 h-64 lg:h-[600px] relative bg-[#93CBDC]/30">
              <Image
                src={mockQuestData.image}
                alt={mockQuestData.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getUrgencyColor(mockQuestData.urgencyLevel)}`}>
                  {mockQuestData.urgencyLevel}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(mockQuestData.status)}`}>
                  {mockQuestData.status}
                </span>
              </div>
            </div>

            {/* Right Side - Quest Information */}
            <div className="lg:w-1/2 p-8">
              <div className="space-y-6">
                
                {/* Quest Title */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-[#322C2C] mb-2">
                    {mockQuestData.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>Dibuat pada {new Date(mockQuestData.createdAt).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-[#322C2C] mb-2">Deskripsi</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {mockQuestData.description}
                  </p>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-[#322C2C] mb-2">Lokasi</h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{mockQuestData.location}</span>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <h3 className="text-lg font-semibold text-[#322C2C] mb-2">Batas Waktu</h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">
                      {new Date(mockQuestData.dueDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Reward */}
                <div>
                  <h3 className="text-lg font-semibold text-[#322C2C] mb-2">Imbalan</h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-[#0189BB]">
                      {mockQuestData.rewardType === 'paid' ? 
                        `Rp ${mockQuestData.rewardAmount.toLocaleString('id-ID')}` : 
                        'Volunteer (Gratis)'
                      }
                    </span>
                  </div>
                </div>

                {/* Quest Maker */}
                <div>
                  <h3 className="text-lg font-semibold text-[#322C2C] mb-2">Pembuat Permintaan</h3>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {mockQuestData.requester.name[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {mockQuestData.requester.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {mockQuestData.requester.email}
                      </div>
                      <div className="text-sm text-gray-600">
                        {mockQuestData.requester.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assigned Staff - Only show if quest is ongoing */}
                {mockQuestData.status === 'Ongoing' && mockQuestData.assignedStaff && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#322C2C] mb-2">Staff yang Menangani</h3>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        S
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Staff Demo
                        </div>
                        <div className="text-sm text-green-600">
                          Sedang menangani permintaan ini
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Details */}
                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Status Konfirmasi</h4>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        mockQuestData.confirmationStatus === 'accepted' ? 'bg-green-100 text-green-800' :
                        mockQuestData.confirmationStatus === 'declined' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mockQuestData.confirmationStatus === 'accepted' ? 'Diterima' :
                         mockQuestData.confirmationStatus === 'declined' ? 'Ditolak' : 'Menunggu'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">ID Permintaan</h4>
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        #{mockQuestData.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleBackClick}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Kembali
                  </button>
                  {mockQuestData.status === 'Open' && mockQuestData.confirmationStatus === 'accepted' && (
                    <button 
                      onClick={handleTakeQuest}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Ambil Tugas
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}