"use client";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef
} from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { FileCard } from "@/components/FileCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface Invoice {
  id: string;
  unit: string;
  description: string;
}

const truncateDescription = (description: string, length: number) => {
  return description.length > length
    ? `${description.substring(0, length)}...`
    : description;
};

const invoices: Invoice[] = [
  {
    id: "1",
    unit: "Unit 1",
    description:
      "Introduction to security attacks, services and mechanism, introduction to cryptography - Conventional Encryption: Conventional encryption model, classical encryption techniques - substitution ciphers and transposition ciphers, cryptanalysis, stream and block ciphers ,Modern Block Ciphers: Block ciphers principals, Shannon's theory of confusion and diffusion, fiestal structure, data encryption standard(DES), strength of DES, differential and linear crypt analysis of DES, block cipher modes of operations, triple DES, AES."
  },
  {
    id: "2",
    unit: "Unit 2",
    description:
      "Confidentiality using conventional encryption, traffic confidentiality, key distribution, random number generation, Introduction to graph, ring and field, prime and relative prime numbers, modular arithmetic, Fermat's and Euler's theorem, primality testing, Euclid's Algorithm, Chinese Remainder theorem, discrete algorithms."
  },
  {
    id: "3",
    unit: "Unit 3",
    description:
      "Principles of public key crypto systems, RSA algorithm, security of RSA, key management, Diffle-Hellman key exchange algorithm, introductory idea of Elliptic curve cryptography, Elgamel encryption, Message Authentication and Hash Function: Authentication requirements, authentication functions, message authentication code, hash functions, birthday attacks, security of hash functions and MACS."
  },
  {
    id: "4",
    unit: "Unit 4",
    description:
      "MD5 message digest algorithm, Secure hash algorithm (SHA), Digital Signatures: Digital Signatures - authentication protocols - digital signature standards (DSS) - proof of digital signature algorithm, Authentication Applications: Kerberos and X.509, directory authentication service, electronic mail security, pretty good privacy (PGP), S/MIME."
  },
  {
    id: "5",
    unit: "Unit 5",
    description:
      "IP Security: Architecture, Authentication header, Encapsulating security payloads, combining security associations, key management."
  },
  {
    id: "6",
    unit: "Unit 6",
    description:
      "Web Security: Secure socket layer and transport layer security, secure electronic transaction (SET), System Security: Intruders - Viruses and related threats, IDS."
  }
];

const Page: React.FC = () => {
  const [hoveredInvoice, setHoveredInvoice] = useState<Invoice | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const fileCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const truncatedHoveredInvoice = useMemo(
    () =>
      hoveredInvoice
        ? {
            ...hoveredInvoice,
            description: truncateDescription(hoveredInvoice.description, 150)
          }
        : null,
    [hoveredInvoice]
  );

  const truncatedSelectedInvoice = useMemo(
    () =>
      selectedInvoice
        ? {
            ...selectedInvoice,
            description: truncateDescription(selectedInvoice.description, 150)
          }
        : null,
    [selectedInvoice]
  );

  const handleMouseEnter = useCallback(
    (file: Invoice) => () => setHoveredInvoice(file),
    []
  );
  const handleMouseLeave = useCallback(() => setHoveredInvoice(null), []);

  const handleRowClick = useCallback(
    (file: Invoice) => {
      setSelectedInvoice(file === selectedInvoice ? null : file);
    },
    [selectedInvoice]
  );

  useEffect(() => {
    if (fileCardRef.current && containerRef.current) {
      gsap.to(fileCardRef.current, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-row justify-center gap-8 p-8 bg-black text-white"
    >
      <div className="w-2/3 overflow-y-auto max-h-screen">
        <Table className="border-separate border-spacing-y-2">
          <TableCaption className="caption-bottom mt-4 text-gray-400">
            A list of units you need to cover to pass.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-left pl-4">Unit</TableHead>
              <TableHead className="text-left">Contents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((file) => (
              <TableRow
                key={file.id}
                onMouseEnter={handleMouseEnter(file)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRowClick(file)}
                className={`cursor-pointer rounded-lg transition-colors ${
                  file === selectedInvoice
                    ? "bg-gray-900"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                <TableCell className="font-medium pl-4">{file.unit}</TableCell>
                <TableCell className="truncate pr-4">
                  {truncateDescription(file.description, 80)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div ref={fileCardRef} className="sticky top-8 w-1/3">
        <FileCard
          className="w-full max-w-[400px] h-[400px] flex flex-col justify-between items-center p-6 border-[1px] border-gray-500 rounded-xl text-white bg-gray-900"
          hoveredInvoice={truncatedHoveredInvoice}
          selectedInvoice={truncatedSelectedInvoice}
        />
      </div>
    </div>
  );
};

export default Page;
