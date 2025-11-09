// Hardcoded Wing Designs for Hackathon Demo
// Special wing configurations: Pizza/Oblique, Curved/Crescent, High-Camber

export interface HardcodedWing {
  id: string;
  name: string;
  category: "oblique" | "curved" | "high_camber";
  description: string;
  config: any;
  color: string;
}

export const hardcodedWings: HardcodedWing[] = [
  // ============================================
  // PIZZA / OBLIQUE WINGS
  // ============================================
  {
    id: "oblique_pizza",
    name: "Pizza Wing (Oblique)",
    category: "oblique",
    description: "Asymmetric oblique wing - pizza slice shape",
    color: "#fbbf24",
    config: {
      wing_type: "oblique_pizza",
      wing_area: 45.0,
      left_span: 18.0,
      right_span: 6.0,
      pivot_point: 0.35,
      sweep_angle: 45,
      left_root_chord: 8.5,
      left_tip_chord: 1.2,
      right_root_chord: 5.0,
      right_tip_chord: 2.0,
      thickness_ratio: 0.08,
      airfoil: "NACA 64A410"
    }
  },
  {
    id: "nasa_ad1",
    name: "NASA AD-1 Oblique",
    category: "oblique",
    description: "Pivoting oblique wing - can rotate 0-60°",
    color: "#f59e0b",
    config: {
      wing_type: "pivoting_oblique",
      wing_area: 8.8,
      total_span: 9.8,
      asymmetry_ratio: 2.5,
      pivot_angle: 45,
      root_chord: 1.8,
      left_tip_chord: 0.6,
      right_tip_chord: 1.2,
      leading_edge_sweep: 45,
      thickness_ratio: 0.06
    }
  },

  // ============================================
  // CURVED WINGS (PLANFORM)
  // ============================================
  {
    id: "crescent_wing",
    name: "Crescent Wing",
    category: "curved",
    description: "Compound sweep with curved planform - Handley Page style",
    color: "#a7f3d0",
    config: {
      wing_type: "crescent_curved",
      wing_area: 65.0,
      wing_span: 15.0,
      curve_type: "compound_sweep",
      inner_sweep: 50,
      mid_sweep: 35,
      outer_sweep: 20,
      transition_points: [0.3, 0.7],
      root_chord: 7.0,
      tip_chord: 1.5,
      planform_curvature: "smooth_blend",
      thickness_ratio_root: 0.08,
      thickness_ratio_tip: 0.05
    }
  },
  {
    id: "scimitar_wing",
    name: "Scimitar Wing",
    category: "curved",
    description: "Curved leading edge, straight trailing edge",
    color: "#86efac",
    config: {
      wing_type: "scimitar_curved",
      wing_area: 52.0,
      wing_span: 14.5,
      leading_edge_curve: "parabolic",
      curve_radius: 25.0,
      root_chord: 6.5,
      tip_chord: 1.8,
      trailing_edge: "straight",
      sweep_root: 45,
      sweep_tip: 15,
      thickness_ratio: 0.07
    }
  },
  {
    id: "boeing_787",
    name: "Boeing 787 Style",
    category: "curved",
    description: "Elegant curved swept wing with raked wingtips",
    color: "#d8b4fe",
    config: {
      wing_type: "smooth_curved_swept",
      wing_area: 377.0,
      wing_span: 60.1,
      planform_shape: "bezier_curve",
      control_points: [
        [0, 0],
        [15, 5],
        [45, 12],
        [60, 30]
      ],
      root_chord: 12.5,
      tip_chord: 2.2,
      raked_wingtips: true,
      thickness_ratio: 0.13
    }
  },

  // ============================================
  // HIGH CAMBER / CURVED SECTION
  // ============================================
  {
    id: "supercritical",
    name: "Supercritical Airfoil",
    category: "high_camber",
    description: "High camber supercritical profile - Boeing style",
    color: "#fca5a5",
    config: {
      wing_type: "supercritical_high_camber",
      wing_area: 125.0,
      wing_span: 35.8,
      root_chord: 7.1,
      tip_chord: 2.2,
      leading_edge_sweep: 25,
      airfoil_root: {
        type: "supercritical",
        max_thickness: 0.14,
        max_camber: 0.06,
        camber_position: 0.45,
        upper_surface: "flat_top",
        lower_surface: "highly_curved"
      },
      airfoil_tip: {
        type: "supercritical",
        max_thickness: 0.11,
        max_camber: 0.04,
        camber_position: 0.40
      }
    }
  },
  {
    id: "high_lift",
    name: "High-Lift STOL",
    category: "high_camber",
    description: "NACA 4415 - extreme curve for short takeoff",
    color: "#fb923c",
    config: {
      wing_type: "high_lift_curved",
      wing_area: 18.5,
      wing_span: 11.2,
      airfoil_root: {
        type: "NACA_44XX_series",
        designation: "NACA 4415",
        max_thickness: 0.15,
        max_camber: 0.04,
        camber_position: 0.4,
        nose_radius: "large"
      },
      section_features: {
        upper_curve: "extreme",
        lower_curve: "moderate",
        trailing_edge: "sharp"
      }
    }
  },
  {
    id: "aerobatic_thick",
    name: "Aerobatic Symmetric",
    category: "high_camber",
    description: "NACA 0018 - 18% thick symmetric for aerobatics",
    color: "#9ca3af",
    config: {
      wing_type: "symmetric_thick",
      wing_area: 12.0,
      wing_span: 8.0,
      airfoil_root: {
        type: "NACA_00XX_series",
        designation: "NACA 0018",
        max_thickness: 0.18,
        symmetric: true,
        upper_curve: "high_arc",
        lower_curve: "high_arc"
      }
    }
  }
];

export function getWingsByCategory(category: string) {
  return hardcodedWings.filter(w => w.category === category);
}

export function getWingById(id: string) {
  return hardcodedWings.find(w => w.id === id);
}

