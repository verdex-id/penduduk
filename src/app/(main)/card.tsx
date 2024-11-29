import { Penduduk } from "@prisma/client";
import Link from "next/link";
import { motion, MotionProps } from "framer-motion";
import { cn } from "../lib/utils";

interface CardProps extends MotionProps {
  penduduk: Penduduk;
}

export default function Card({ penduduk, ...motionProps }: CardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden group",
        "bg-white/5 backdrop-blur-xl",
        "border border-white/10",
        "shadow-2xl shadow-primary/10",
        "rounded-2xl p-6 h-full text-white",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-2xl hover:scale-[1.02]",
        "cursor-pointer"
      )}
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      }}
      {...motionProps}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br 
        from-white/10 to-white/5 
        opacity-50 blur-2xl -z-10"
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <div className="text-white/60 text-sm font-mono tracking-wider">
            {penduduk.nik}
          </div>
          <motion.div
            className="w-2 h-2 bg-white/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <h2
          className="font-bold text-xl mb-2 line-clamp-2 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-white to-white/70"
        >
          {penduduk.nama}
        </h2>

        <p
          className="text-white/80 line-clamp-3 mb-4 
          text-sm italic"
        >
          {penduduk.alamat}
        </p>

        <div className="mt-auto">
          <Link href={`/penduduk/${penduduk.nik}`} className="block">
            <motion.div
              className="px-4 py-2 
              bg-white/10 
              border border-white/20 
              rounded-xl 
              text-center 
              text-white/90
              hover:bg-white/20
              transition-all duration-300"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat Detail
            </motion.div>
          </Link>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 right-0 h-0.5 
        bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
    </motion.div>
  );
}
