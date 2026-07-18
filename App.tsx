import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Patient = {
  id: string;
  name: string;
  age: number;
  condition: string;
  doctor: string;
  lastVisit: string;
};

const PATIENTS: Patient[] = [
  { id: 'P-1001', name: 'Aarav Sharma', age: 42, condition: 'Hypertension', doctor: 'Dr. Patel', lastVisit: '2026-04-21' },
  { id: 'P-1002', name: 'Neha Verma', age: 34, condition: 'Diabetes Type 2', doctor: 'Dr. Khan', lastVisit: '2026-04-19' },
  { id: 'P-1003', name: 'Rohan Singh', age: 58, condition: 'Cardiac Follow-up', doctor: 'Dr. Mehta', lastVisit: '2026-04-18' },
  { id: 'P-1004', name: 'Priya Nair', age: 29, condition: 'Asthma', doctor: 'Dr. Gupta', lastVisit: '2026-04-17' },
  { id: 'P-1005', name: 'Karan Malhotra', age: 47, condition: 'Arthritis', doctor: 'Dr. Iyer', lastVisit: '2026-04-15' },
  { id: 'P-1006', name: 'Ananya Das', age: 39, condition: 'Migraine', doctor: 'Dr. Kapoor', lastVisit: '2026-04-14' },
  { id: 'P-1007', name: 'Vikram Joshi', age: 63, condition: 'Post-surgery Review', doctor: 'Dr. Patel', lastVisit: '2026-04-13' },
  { id: 'P-1008', name: 'Sneha Rao', age: 31, condition: 'Thyroid Management', doctor: 'Dr. Khan', lastVisit: '2026-04-11' },
  { id: 'P-1009', name: 'Rahul Menon', age: 54, condition: 'Kidney Checkup', doctor: 'Dr. Mehta', lastVisit: '2026-04-10' },
  { id: 'P-1010', name: 'Ishita Roy', age: 26, condition: 'Anemia', doctor: 'Dr. Gupta', lastVisit: '2026-04-08' },
  { id: 'P-1011', name: 'Aditya Kulkarni', age: 45, condition: 'Liver Health', doctor: 'Dr. Iyer', lastVisit: '2026-04-07' },
  { id: 'P-1012', name: 'Meera Bansal', age: 36, condition: 'PCOS', doctor: 'Dr. Kapoor', lastVisit: '2026-04-05' },
];

const PATIENTS_PER_PAGE = 4;
const MOBILE_TABS = ['Home', 'Patients', 'Appointments', 'Profile'] as const;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<(typeof MOBILE_TABS)[number]>('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = Platform.OS !== 'web';

  const totalPages = Math.ceil(PATIENTS.length / PATIENTS_PER_PAGE);
  const currentPatients = useMemo(() => {
    const start = (currentPage - 1) * PATIENTS_PER_PAGE;
    const end = start + PATIENTS_PER_PAGE;
    return PATIENTS.slice(start, end);
  }, [currentPage]);

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isMobile && styles.containerWithBottomNavSpace,
        ]}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Patient Track</Text>
            <Text style={styles.subtitle}>Home Dashboard</Text>
          </View>
          {isMobile ? (
            <Pressable
              onPress={() => setMenuOpen((prev) => !prev)}
              style={styles.menuButton}
            >
              <Text style={styles.menuButtonText}>{menuOpen ? 'Close' : 'Menu'}</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={styles.listWrapper}>
          {currentPatients.map((patient) => (
            <View key={patient.id} style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.name}>{patient.name}</Text>
                <Text style={styles.id}>{patient.id}</Text>
              </View>
              <Text style={styles.meta}>Age: {patient.age}</Text>
              <Text style={styles.meta}>Condition: {patient.condition}</Text>
              <Text style={styles.meta}>Doctor: {patient.doctor}</Text>
              <Text style={styles.meta}>Last Visit: {patient.lastVisit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.pagination}>
          <Pressable
            onPress={goToPrevious}
            disabled={currentPage === 1}
            style={[
              styles.pageButton,
              currentPage === 1 && styles.pageButtonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </Pressable>
          <Text style={styles.pageIndicator}>
            Page {currentPage} of {totalPages}
          </Text>
          <Pressable
            onPress={goToNext}
            disabled={currentPage === totalPages}
            style={[
              styles.pageButton,
              currentPage === totalPages && styles.pageButtonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
      {isMobile && menuOpen ? (
        <View style={styles.menuContainer}>
          <Pressable
            style={styles.menuBackdrop}
            onPress={() => setMenuOpen(false)}
          />
          <View style={styles.menuPanel}>
            <Text style={styles.menuTitle}>Quick Menu</Text>
            <Pressable style={styles.menuItem} onPress={() => setMenuOpen(false)}>
              <Text style={styles.menuItemText}>Dashboard</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => setMenuOpen(false)}>
              <Text style={styles.menuItemText}>Add Patient</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => setMenuOpen(false)}>
              <Text style={styles.menuItemText}>Reports</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => setMenuOpen(false)}>
              <Text style={styles.menuItemText}>Settings</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
      {isMobile ? (
        <View style={styles.mobileNavBar}>
          {MOBILE_TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.mobileNavItem, isActive && styles.mobileNavItemActive]}
              >
                <Text
                  style={[
                    styles.mobileNavText,
                    isActive && styles.mobileNavTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  containerWithBottomNavSpace: {
    paddingBottom: 96,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#102a43',
  },
  subtitle: {
    fontSize: 16,
    color: '#486581',
    marginTop: 4,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  menuButton: {
    backgroundColor: '#0b69ff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  menuButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
  listWrapper: {
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#d9e2ec',
    shadowColor: '#102a43',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#102a43',
    flexShrink: 1,
  },
  id: {
    fontSize: 12,
    color: '#627d98',
    fontWeight: '600',
  },
  meta: {
    fontSize: 14,
    color: '#334e68',
    marginTop: 2,
  },
  pagination: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  pageButton: {
    backgroundColor: '#0b69ff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  pageButtonDisabled: {
    backgroundColor: '#9fb3c8',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  pageIndicator: {
    fontSize: 14,
    color: '#243b53',
    fontWeight: '500',
  },
  menuContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 20,
  },
  menuBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16, 42, 67, 0.2)',
  },
  menuPanel: {
    width: 190,
    marginTop: 68,
    marginRight: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9e2ec',
    paddingVertical: 8,
    shadowColor: '#102a43',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#486581',
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#102a43',
    fontWeight: '500',
  },
  mobileNavBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d9e2ec',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 6,
    shadowColor: '#102a43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  mobileNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  mobileNavItemActive: {
    backgroundColor: '#e6f0ff',
  },
  mobileNavText: {
    color: '#486581',
    fontSize: 12,
    fontWeight: '600',
  },
  mobileNavTextActive: {
    color: '#0b69ff',
  },
});
