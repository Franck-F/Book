"use client"

import React from "react"
import { AnimeNavBar } from "@/components/ui/AnimeNavBar"
import { Home, User, Briefcase, BookOpen, GraduationCap, Mail } from "lucide-react"

export default function Navbar() {
    const navItems = [
        { name: "Accueil", url: "/", icon: Home },
        { name: "Portfolio", url: "/portfolio", icon: Briefcase },
        { name: "Projets", url: "/projects", icon: GraduationCap },
        { name: "Blog", url: "/blog", icon: BookOpen },
        { name: "Tutoriels", url: "/tutorials", icon: User },
        { name: "Contact", url: "/contact", icon: Mail },
    ]

    return <AnimeNavBar items={navItems} />
}
