import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ShieldCheck, Loader2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import { userAPI } from '../../services/api';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match");
    }
    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    setLoading(true);
    try {
      const { data } = await userAPI.changePassword({
        oldPassword,
        newPassword
      });

      if (data.success) {
        toast.success("Password updated successfully");
        onClose();
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error: any) {
      console.error("Change password error:", error);
      toast.error(error.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#1C1B1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#C5A059]/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C5A059]/20 rounded-xl flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-[#C5A059]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#FAF8F4] font-fraunces">Change Password</h3>
                  <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-bold">Secure Account Access</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#9CA3AF] hover:text-[#FAF8F4] hover:bg-white/5 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Old Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[#FAF8F4] placeholder-white/20 focus:outline-none focus:border-[#C5A059] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[#FAF8F4] placeholder-white/20 focus:outline-none focus:border-[#C5A059] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Confirm New Password</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[#FAF8F4] placeholder-white/20 focus:outline-none focus:border-[#C5A059] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C5A059] hover:bg-[#A88748] text-[#1C1B1A] font-bold py-4 rounded-xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 uppercase tracking-widest text-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>Update Password</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
