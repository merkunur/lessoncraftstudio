import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/email/templates/[id] - Get a single email template
export const GET = withAdmin(
  async (request: NextRequest, user: any, context: { params: { id: string } }) => {
    try {
      const template = await prisma.emailTemplate.findUnique({
        where: { id: context.params.id },
      });

      if (!template) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }

      return NextResponse.json({ template });
    } catch (error) {
      console.error('Get email template error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch email template' },
        { status: 500 }
      );
    }
  }
);

// PUT /api/admin/email/templates/[id] - Update an email template
export const PUT = withAdmin(
  async (request: NextRequest, user: any, context: { params: { id: string } }) => {
    try {
      const body = await request.json();
      const { name, subject, htmlContent, textContent, variables, active } = body;

      // Check if template exists
      const existingTemplate = await prisma.emailTemplate.findUnique({
        where: { id: context.params.id },
      });

      if (!existingTemplate) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }

      // If name is being changed, check for conflicts
      if (name && name !== existingTemplate.name) {
        const nameConflict = await prisma.emailTemplate.findUnique({
          where: { name },
        });

        if (nameConflict) {
          return NextResponse.json(
            { error: 'A template with this name already exists' },
            { status: 400 }
          );
        }
      }

      // Update template
      const data: any = {};
      if (name !== undefined) data.name = name;
      if (subject !== undefined) data.subject = subject;
      if (htmlContent !== undefined) data.htmlContent = htmlContent;
      if (textContent !== undefined) data.textContent = textContent || null;
      if (variables !== undefined) data.variables = variables;
      if (active !== undefined) data.active = active;

      const template = await prisma.emailTemplate.update({
        where: { id: context.params.id },
        data,
      });

      return NextResponse.json({
        message: 'Email template updated successfully',
        template,
      });
    } catch (error) {
      console.error('Update email template error:', error);
      return NextResponse.json(
        { error: 'Failed to update email template' },
        { status: 500 }
      );
    }
  }
);

// DELETE /api/admin/email/templates/[id] - Delete an email template
export const DELETE = withAdmin(
  async (request: NextRequest, user: any, context: { params: { id: string } }) => {
    try {
      // Check if template exists
      const template = await prisma.emailTemplate.findUnique({
        where: { id: context.params.id },
      });

      if (!template) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }

      // Delete template
      await prisma.emailTemplate.delete({
        where: { id: context.params.id },
      });

      return NextResponse.json({
        message: 'Email template deleted successfully',
      });
    } catch (error) {
      console.error('Delete email template error:', error);
      return NextResponse.json(
        { error: 'Failed to delete email template' },
        { status: 500 }
      );
    }
  }
);
